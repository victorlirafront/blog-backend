# Docker Setup

Este projeto está configurado para rodar com Docker, incluindo o banco de dados MySQL.

## 🚀 Quick Start

### Produção

```bash
# Build e start todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Parar todos os serviços
docker-compose down
```

### Desenvolvimento

```bash
# Start com hot-reload
docker-compose --profile dev up -d

# A aplicação estará disponível em http://localhost:3002
```

## 📁 Estrutura

```
blog-backend/
├── Dockerfile              # Multi-stage build
├── docker-compose.yml      # Orquestração dos serviços
├── .dockerignore          # Arquivos ignorados no build
└── docker/
    └── mysql/
        └── init/          # Scripts de inicialização do MySQL
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` baseado no exemplo:

```bash
# Application
NODE_ENV=development
PORT=3001

# Database
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=blog_user
DB_PASSWORD=blog_password
DB_DATABASE=blog_db

# Email (opcional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Portas

- **3001**: Aplicação em produção
- **3002**: Aplicação em desenvolvimento (hot-reload)
- **3306**: MySQL

## 🛠️ Comandos Úteis

```bash
# Build da imagem
docker-compose build

# Rebuild forçado
docker-compose build --no-cache

# Executar comandos dentro do container
docker-compose exec app npm run seed

# Ver logs de um serviço específico
docker-compose logs mysql

# Parar e remover volumes
docker-compose down -v

# Limpar tudo
docker system prune -a
```

## 🔍 Troubleshooting

### Problema com Husky

O Husky foi configurado para não executar em containers Docker. Se você encontrar erros relacionados ao Husky, verifique:

1. O script `prepare` no `package.json`
2. O uso de `--ignore-scripts` no Dockerfile

### Problema com MySQL

```bash
# Verificar se o MySQL está rodando
docker-compose ps mysql

# Conectar ao MySQL
docker-compose exec mysql mysql -u blog_user -p blog_db

# Ver logs do MySQL
docker-compose logs mysql
```

### Problema com a Aplicação

```bash
# Verificar health check
docker-compose exec app wget --no-verbose --tries=1 --spider http://localhost:3001/api

# Ver logs da aplicação
docker-compose logs app

# Executar testes
docker-compose exec app npm test
```

## 🎯 Benefícios

- **Isolamento**: Cada serviço roda em seu próprio container
- **Consistência**: Mesmo ambiente em desenvolvimento e produção
- **Facilidade**: Setup rápido com um comando
- **Portabilidade**: Funciona em qualquer sistema com Docker
- **Escalabilidade**: Fácil de escalar horizontalmente

## 📝 Notas

- O banco de dados MySQL persiste os dados em um volume Docker
- A aplicação em desenvolvimento tem hot-reload configurado
- Health checks garantem que os serviços estejam funcionando
- Usuário não-root para segurança
