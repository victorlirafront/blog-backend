# 📝 **Guia de Migrations (Nest + TypeORM)**

## ✅ **Passo a passo**

### 1. Atualize a entidade

Faça as mudanças na entidade primeiro (criar coluna, alterar tipo, etc).

### 2. Gere a migration

```bash
npm run migration:generate NomeDaMigration
```

O script automaticamente cria o arquivo em `src/migrations/`.

### 3. Verifique o código

Confira se o `up()` e `down()` estão corretos.

### 4. Execute no banco

```bash
npm run migration:run
```

### 5. Commit

Inclua o arquivo `src/migrations/xxxx-NomeDaMigration.ts` no commit.

---

## 🔧 **Comandos**

```bash
# Gerar migration (só desenvolvimento)
npm run migration:generate NomeDaMigration

# Executar migrations no banco
npm run migration:run

# Ver status
npm run migration:show

# Reverter última migration
npm run migration:revert
```

---

## ⚠️ **Importante**

### ✅ **Desenvolvimento:**

- Pode usar todos os comandos

### ✅ **Produção:**

- Apenas `migration:run` e `migration:show`

### ❌ **NUNCA em produção:**

- `migration:generate` - Não gere migrations em produção
- `migration:create` - Não crie migrations em produção
- `migration:revert` - Use só em emergências

---

## ❌ **O que NÃO fazer**

- ❌ Gerar migrations no CI/CD ou produção
- ❌ Editar o banco manualmente
- ❌ Usar `synchronize: true` em produção
- ❌ Deixar migrations com nome genérico

---
