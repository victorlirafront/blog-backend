# Blog Backend

Blog desenvolvido com Clean Architecture e NestJS, incluindo sistema de posts e envio de emails.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para banco de dados
- **MySQL** - Banco de dados
- **Nodemailer** - Envio de emails
- **Railway** - Deploy e hosting
- **Jest** - Testes unitários

## 🛠️ Instalação Local

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd blog-backend
```

2. **Configure as variáveis de ambiente:**
```bash
# Crie um arquivo .env com suas credenciais
DB_HOST=seu-host-mysql
DB_PORT=3306
DB_USERNAME=seu-usuario
DB_PASSWORD=sua-senha
DB_DATABASE=seu-banco
USER_EMAIL=seu-email@gmail.com
APP_PASSWORD=sua-senha-app-gmail
```

3. **Execute o projeto:**

### Localmente (Node.js)
```bash
npm install
npm run start:dev
```

### Com Docker
```bash
# Desenvolvimento com banco local
docker-compose up app_dev mysql -d

# Apenas a aplicação (usando banco externo)
docker-compose up app -d
```

## 🧪 Testes

```bash
npm test              # Executar testes
npm run test:cov      # Testes com coverage
npm run ci:test       # Pipeline completo
```

## 📊 Endpoints da API

### Posts
- `GET /api/posts` - Listar posts (com paginação)
- `POST /api/posts` - Criar post
- `PUT /api/posts/:id` - Atualizar post
- `DELETE /api/posts/:id` - Deletar post
- `GET /api/posts/search?q=termo` - Buscar posts

### Email
- `POST /api/sendEmail` - Enviar email de contato


## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request
