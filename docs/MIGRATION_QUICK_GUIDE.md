# Guia Rapido de Migrations

## Passo a Passo

### 1. Atualize a entidade

Edite o arquivo da entidade (ex: `src/modules/posts/entities/post.entity.ts`)

- Adicione/remova colunas
- Altere tipos
- Adicione relacionamentos

### 2. Gere a migration

```bash
npm run migration:generate -- NomeDaMigration
```

Exemplo: `npm run migration:generate -- AddEmailColumnToUsers`

### 3. Revise o codigo

Abra o arquivo gerado em `src/migrations/` e verifique:

- `up()` faz o que voce espera?
- `down()` desfaz corretamente?

### 4. Execute no banco local

```bash
npm run migration:run
```

### 5. Teste o rollback (opcional)

```bash
npm run migration:revert
npm run migration:run  # Reexecuta
```

### 6. Commit

Adicione o arquivo `src/migrations/xxxx-NomeDaMigration.ts` no commit.

---

## Comandos Essenciais

```bash
# Gerar migration (so desenvolvimento)
npm run migration:generate -- NomeDaMigration

# Executar migrations
npm run migration:run

# Ver status das migrations
npm run migration:show

# Reverter ultima migration
npm run migration:revert
```

---

## Regras Importantes

### Desenvolvimento:

- Pode usar todos os comandos

### Producao:

- Apenas `migration:run` e `migration:show`
- Migrations rodam automaticamente no Docker

### NUNCA:

- Gerar migrations em producao
- Editar banco manualmente
- Usar `synchronize: true` em producao
- Deixar migrations com nome generico

---

## Docker

As migrations sao executadas automaticamente quando o container inicia:

- **Producao:** Via `docker-entrypoint.sh`
- **Desenvolvimento:** Via `scripts/start-dev.sh`

---

## Exemplo Completo

```bash
# 1. Editar entidade (adicionar coluna)
# src/modules/posts/entities/post.entity.ts
@Column({ type: 'varchar', length: 100 })
email: string;

# 2. Gerar migration
npm run migration:generate -- AddEmailToPosts

# 3. Verificar arquivo gerado
# src/migrations/xxxx-AddEmailToPosts.ts

# 4. Executar
npm run migration:run

# 5. Commit
git add src/migrations/xxxx-AddEmailToPosts.ts
git commit -m "feat: add email column to posts"
```
