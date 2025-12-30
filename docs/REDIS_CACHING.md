# Redis e Caching no NestJS: Como Funcionam Juntos

## Visão Geral

O NestJS utiliza o **CacheModule** como uma camada de abstração que permite trabalhar com diferentes sistemas de cache, incluindo Redis. Esta arquitetura separa a lógica de negócio da implementação específica do cache, proporcionando flexibilidade e facilidade de manutenção.

## Arquitetura em Camadas

```
┌─────────────────────────────────────┐
│     Aplicação NestJS                │
│  (PostService, Controllers, etc)    │
└──────────────┬──────────────────────┘
               │
               │ Usa CacheService (abstração)
               ▼
┌─────────────────────────────────────┐
│     CacheModule (NestJS)            │
│  - Interface padronizada            │
│  - CACHE_MANAGER                    │
└──────────────┬──────────────────────┘
               │
               │ Configurado com redisStore
               ▼
┌─────────────────────────────────────┐
│     Redis (Backend de Armazenamento)│
│  - Banco em memória                 │
│  - Alta performance                │
└─────────────────────────────────────┘
```

## Como Funciona a Integração

### 1. Configuração no AppModule

No `app.module.ts`, o `CacheModule` é configurado para usar Redis como backend:

```typescript
CacheModule.registerAsync({
  isGlobal: true,
  useFactory: async () => {
    const store = await redisStore({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
      ttl: 300000, // 5 minutos padrão
    });
    return { store };
  },
});
```

**O que acontece aqui:**

- O NestJS registra o `CacheModule` como global
- O `redisStore` cria uma conexão com o servidor Redis
- O Redis passa a ser o "armazenamento" do cache
- Se o Redis falhar, o sistema pode fazer fallback para cache em memória

### 2. Uso na Aplicação

O código da aplicação não precisa saber que está usando Redis. Ele trabalha apenas com a abstração do NestJS:

```typescript
// No PostService
constructor(
  private cacheService: CacheService, // Abstração do NestJS
) {}

async findById(id: number) {
  // Busca no cache (que internamente usa Redis)
  const cached = await this.cacheService.get(`post:id:${id}`);

  if (cached) {
    return cached; // Dados vêm do Redis
  }

  // Se não estiver no cache, busca no MySQL
  const post = await this.postRepository.findOne({ where: { id } });

  // Salva no cache (que internamente salva no Redis)
  await this.cacheService.set(`post:id:${id}`, post, 600000);

  return post;
}
```

## Fluxo de Dados

### Primeira Requisição (Cache Miss)

```
1. Cliente faz requisição GET /api/posts/1
   ↓
2. PostService.findById(1) é chamado
   ↓
3. CacheService.get('post:id:1')
   ↓
4. CacheModule verifica no Redis
   ↓
5. Redis retorna null (não existe)
   ↓
6. PostService busca no MySQL
   ↓
7. PostService salva no cache: CacheService.set('post:id:1', post)
   ↓
8. CacheModule salva no Redis
   ↓
9. Retorna post para o cliente
```

### Requisições Subsequentes (Cache Hit)

```
1. Cliente faz requisição GET /api/posts/1
   ↓
2. PostService.findById(1) é chamado
   ↓
3. CacheService.get('post:id:1')
   ↓
4. CacheModule verifica no Redis
   ↓
5. Redis retorna dados (existe no cache) ⚡
   ↓
6. Retorna post para o cliente (sem consultar MySQL!)
```

## Vantagens desta Arquitetura

### 1. **Abstração**

- O código não precisa saber que está usando Redis
- Pode trocar Redis por outro sistema sem mudar o código de negócio
- Facilita testes (pode usar cache em memória nos testes)

### 2. **Performance**

- Redis é extremamente rápido (operações em memória)
- Reduz carga no MySQL
- Respostas mais rápidas para o cliente

### 3. **Escalabilidade**

- Redis pode ser compartilhado entre múltiplas instâncias da aplicação
- Cache persistente mesmo se a aplicação reiniciar
- Suporta milhões de operações por segundo

### 4. **Flexibilidade**

- TTL (Time To Live) configurável por chave
- Invalidação seletiva de cache
- Fallback automático se Redis estiver indisponível

## Exemplo Prático no Projeto

### Cache de Listagens

```typescript
async findAll(paginationDto: PaginationDto) {
  const cacheKey = CACHE_KEYS.POSTS_LIST(category, page, limit);

  // 1. Tenta buscar no Redis via CacheService
  const cached = await this.cacheService.get(cacheKey);
  if (cached) return cached; // ⚡ Cache hit!

  // 2. Se não estiver no cache, busca no MySQL
  const posts = await this.postRepository.find({ where: { category } });

  // 3. Salva no Redis via CacheService (TTL de 5 minutos)
  await this.cacheService.set(cacheKey, posts, CACHE_TTL.SHORT);

  return posts;
}
```

### Invalidação de Cache

Quando um post é atualizado ou deletado, o cache relacionado é invalidado:

```typescript
async update(id: number, updatePostDto: UpdatePostDto) {
  // Atualiza no MySQL
  await this.postRepository.update({ id }, updatePostDto);

  // Invalida cache no Redis
  await this.cacheService.invalidatePostCache(id, post.slug, post.author);
  await this.cacheService.invalidatePostsListCache();
}
```

## Configuração do Redis

### Variáveis de Ambiente

```env
REDIS_HOST=localhost    # Host do servidor Redis
REDIS_PORT=6379         # Porta do Redis
```

### Docker Compose

O Redis é executado como um serviço separado:

```yaml
redis:
  image: redis:7-alpine
  ports:
    - '6379:6379'
  volumes:
    - redis_data:/data
```

## TTL (Time To Live)

O TTL define quanto tempo os dados ficam no cache antes de expirar:

- **SHORT (5 minutos)**: Listagens e buscas
- **MEDIUM (10 minutos)**: Posts individuais
- **LONG (30 minutos)**: Dados que mudam raramente

Após o TTL expirar, o Redis remove automaticamente a chave, forçando uma nova busca no MySQL.

## Resumo

1. **NestJS CacheModule**: Fornece a interface padronizada
2. **Redis**: Armazena os dados em memória (backend)
3. **CacheService**: Abstrai o uso do cache na aplicação
4. **Benefícios**: Performance, escalabilidade e flexibilidade

A combinação NestJS + Redis oferece uma solução robusta de cache que melhora significativamente a performance da aplicação sem adicionar complexidade ao código de negócio.
