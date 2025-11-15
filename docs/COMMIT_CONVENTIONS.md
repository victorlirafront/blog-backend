# Padrões de Commit

Este projeto usa **Conventional Commits** para padronizar as mensagens de commit.

## Formato

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Tipos de Commit

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação, ponto e vírgula, etc
- **refactor**: Refatoração de código
- **perf**: Melhoria de performance
- **test**: Adicionando testes
- **chore**: Tarefas de manutenção
- **ci**: Mudanças em CI/CD
- **build**: Mudanças no build
- **revert**: Reverter commit anterior

## Exemplos

```bash
# Nova funcionalidade
git commit -m "feat: adiciona autenticação JWT"

# Correção de bug
git commit -m "fix: corrige validação de email"

# Documentação
git commit -m "docs: atualiza README com instruções de instalação"

# Refatoração
git commit -m "refactor: reorganiza estrutura de módulos"

# Testes
git commit -m "test: adiciona testes para PostService"

# Manutenção
git commit -m "chore: atualiza dependências"
```

## Hooks Configurados

### Pre-commit

- Executa `lint-staged` que roda:
  - ESLint nos arquivos `.js` e `.ts`
  - Prettier em todos os arquivos

### Commit-msg

- Valida se a mensagem segue o padrão Conventional Commits

## Comandos Úteis

```bash
# Verificar se tudo está configurado
npm run lint

# Formatar código
npm run format

# Executar testes
npm test
```

## Dicas

1. Use verbos no imperativo: "adiciona", "corrige", "atualiza"
2. Seja específico na descrição
3. Use escopo quando relevante: `feat(auth): adiciona login`
4. Máximo de 72 caracteres na primeira linha
