# Guia de Migrations

## Passo a Passo

### 1. Edite a entidade

Faça as mudanças na entidade (ex: `src/modules/posts/entities/post.entity.ts`)

### 2. Gere a migration

```bash
npm run migration:generate -- NomeDaMigration
```

### 3. Revise a migration gerada

Abra o arquivo em `src/migrations/` e verifique:

- ⚠️ **Procure por `DROP COLUMN` + `ADD COLUMN`** → Deve ser `MODIFY COLUMN`
- O script corrige automaticamente, mas sempre revise!

**Exemplo de correção:**

```typescript
// ❌ Perigoso (perde dados)
DROP COLUMN title
ADD title varchar(300)

// ✅ Seguro (preserva dados)
MODIFY COLUMN title varchar(300)
```

### 4. Execute no banco

```bash
npm run migration:run
```

### 5. Teste a aplicação

### 6. Commit

```bash
git add src/migrations/xxxx-NomeDaMigration.ts
git commit -m "feat: descrição da mudança"
```

---

## Checklist

- [ ] Editei a entidade
- [ ] Gerei a migration
- [ ] Revisei o código (procure por `DROP COLUMN`)
- [ ] Executei no banco local
- [ ] Testei a aplicação
- [ ] Fiz commit da migration

---

## Comandos

```bash
# Gerar migration
npm run migration:generate -- NomeDaMigration

# Executar migrations
npm run migration:run

# Ver status
npm run migration:show

# Reverter última migration
npm run migration:revert
```

---

## Como Funciona em Produção

As migrations rodam **automaticamente** quando o container Docker inicia. O fluxo é o seguinte:

### Fluxo Automático

1. **Dockerfile** define o `ENTRYPOINT` como `docker-entrypoint.sh`
2. **docker-entrypoint.sh** executa as migrations **antes** de iniciar a aplicação:
   - Tenta rodar `npm run typeorm:migration:run` (até 3 tentativas com delay de 5s)
   - Se sucesso ou se já aplicadas, continua
   - Se falhar após 3 tentativas, também continua (migrations podem já estar aplicadas)
3. **scripts/run-migrations.js** usa o `AppDataSource` compilado (`dist/data-source.js`)
   - Aplica apenas migrations pendentes
   - Ignora migrations já aplicadas (não causa erro)

### Quando Executa

As migrations rodam automaticamente em:

- **Deploy inicial** → Aplica todas as migrations pendentes
- **Restart do container** → Verifica e aplica apenas as novas migrations
- **Novo deploy** → Aplica apenas migrations pendentes desde o último deploy

### Importante

- ✅ Você **não precisa** executar migrations manualmente em produção
- ✅ Apenas faça commit das migrations e faça deploy
- ✅ O sistema aplica automaticamente as migrations pendentes
- ⚠️ Se uma migration falhar, o container continua iniciando (para não travar em caso de migrations já aplicadas)

---

## Regras

### ✅ Desenvolvimento

- Pode usar todos os comandos
- Execute migrations manualmente com `npm run migration:run`

### ✅ Produção

- Migrations rodam automaticamente no Docker (não precisa executar manualmente)
- Apenas `migration:show` para verificar status (se necessário)

### ❌ NUNCA

- Gerar migrations em produção
- Editar banco manualmente
- Usar `synchronize: true` em produção
- Executar `migration:revert` em produção

---

## Exemplo Completo

```bash
# 1. Editar entidade
# Adicionar: @Column({ type: 'varchar', length: 100 }) email: string;

# 2. Gerar migration
npm run migration:generate -- AddEmailToPosts

# 3. Revisar arquivo gerado
# src/migrations/xxxx-AddEmailToPosts.ts

# 4. Executar
npm run migration:run

# 5. Commit
git add src/migrations/xxxx-AddEmailToPosts.ts
git commit -m "feat: add email column to posts"
```
