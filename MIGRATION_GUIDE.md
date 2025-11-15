# 📝 **Instruções para criar migrations (Nest + TypeORM)**

Quando você precisar criar ou alterar alguma tabela no banco, siga este passo a passo:

---

## ✅ **1. Atualize ou crie a entidade correspondente**

Exemplo:

- Criar coluna nova
- Alterar tipo
- Criar nova entidade
- Adicionar relacionamento

Sempre faça a mudança primeiro no código (entity).

---

## ✅ **2. Gere a migration localmente**

Depois que a entidade estiver pronta, execute:

```bash
npm run migration:generate src/migrations/NomeDaMigration
```

Esse comando vai criar um arquivo dentro da pasta `src/migrations` com base nas diferenças entre suas entidades e o banco de dados atual.

**Nota:** O comando compara o estado atual do banco com suas entidades e gera automaticamente a migration necessária.

---

## ✅ **3. Verifique o conteúdo da migration**

Antes de commitar:

- Confira se o `up()` faz exatamente o que você espera
- Confira se o `down()` desfaz corretamente
- Veja se não tem comandos extras ou inesperados

Se estiver errado: ajuste manualmente ou gere novamente.

---

## ✅ **4. Rode a migration no ambiente local**

Para garantir que ela funciona de verdade:

```bash
npm run migration:run
```

Depois teste o rollback:

```bash
npm run migration:revert
```

Se tudo estiver ok, rode novamente o run:

```bash
npm run migration:run
```

---

## ✅ **5. Adicione no commit**

Inclua o arquivo da migration no seu PR:

```
src/migrations/xxxx-NomeDaMigration.ts
```

Nunca deixe migrations de fora do commit.

---

## ❌ **6. O que NÃO fazer**

- ❌ **NÃO** gerar migrations no CI/CD ou produção (`migration:generate`)
- ❌ **NÃO** editar o banco manualmente
- ❌ **NÃO** usar `synchronize: true` em produção
- ❌ **NÃO** criar migrations direto na produção
- ❌ **NÃO** deixar migrations com nome genérico (tipo: `Migration123`)
- ❌ **NÃO** executar `migration:generate` em produção (só em desenvolvimento)

---

## ✔️ **Resumo rápido**

```
1. Ajustar entidade
2. Gerar migration
3. Validar código da migration
4. Rodar localmente (run → revert → run)
5. Committar e enviar para revisão
```

---

## 🔧 **Comandos disponíveis**

```bash
# Gerar migration automaticamente (APENAS em desenvolvimento)
npm run migration:generate src/migrations/NomeDaMigration
# ⚠️ NUNCA use em produção! Apenas em desenvolvimento.

# Criar migration vazia (para editar manualmente)
npm run migration:create src/migrations/NomeDaMigration
# ⚠️ Apenas em desenvolvimento.

# Executar migrations pendentes (pode usar em produção)
npm run migration:run
# ✅ Use em produção para aplicar migrations já criadas e testadas.

# Reverter última migration
npm run migration:revert
# ⚠️ Use com cuidado, principalmente em produção.

# Ver status das migrations
npm run migration:show
# ✅ Pode usar em qualquer ambiente.
```

---

## ⚠️ **IMPORTANTE: Comandos por ambiente**

### ✅ **Desenvolvimento (pode usar todos):**

- `migration:generate` - Gerar migrations automaticamente
- `migration:create` - Criar migration vazia
- `migration:run` - Executar migrations
- `migration:revert` - Reverter migrations
- `migration:show` - Ver status

### ✅ **Produção (apenas estes):**

- `migration:run` - Executar migrations já criadas e testadas
- `migration:show` - Ver status das migrations

### ❌ **NUNCA em produção:**

- `migration:generate` - Pode gerar migrations inesperadas
- `migration:create` - Não faz sentido criar migrations em produção
- `migration:revert` - Use apenas em emergências e com muito cuidado

---

**Pronto!** Agora você tem tudo configurado para trabalhar com migrations no projeto.
