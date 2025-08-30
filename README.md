# Blog Backend

<<<<<<< Updated upstream
<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo"  />
  </a>
</p>

<h1 align="center">Blog Posts API</h1>

<p align="center">
  Projeto desenvolvido com <a href="https://nestjs.com/" target="_blank">NestJS</a> para gerenciamento de posts em um blog.
</p>

---

## 🚀 Tecnologias

* [Node.js](https://nodejs.org/)
* [NestJS](https://nestjs.com/)
* [TypeORM](https://typeorm.io/)
* [MySQL](https://www.mysql.com/)
=======
Blog desenvolvido com Clean Architecture e NestJS, incluindo sistema de posts e envio de emails.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para banco de dados
- **MySQL** - Banco de dados
- **Nodemailer** - Envio de emails
- **Docker** - Containerização
- **Jest** - Testes unitários
>>>>>>> Stashed changes

## 🛠️ Instalação

### Com Docker (Recomendado)

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
```bash
# Desenvolvimento
docker-compose up app_dev mysql -d

# Produção
docker-compose up app mysql -d
```

### Local (sem Docker)

```bash
npm install
<<<<<<< Updated upstream
```

---

## 🛠️ Configuração do Banco de Dados

1. Instale e abra o **XAMPP** para iniciar o MySQL.
2. Acesse: http://localhost/phpmyadmin/
3. Crie um banco de dados com o nome:

```
blog_db
```

> Ou utilize o nome definido na variável `DB_NAME` do arquivo `.env`.

3. Verifique se os dados de conexão estão corretos no arquivo `.env`.

---

## ▶️ Executar o Projeto

```bash
=======
>>>>>>> Stashed changes
npm run start:dev
```

## 🧪 Testes

```bash
npm test              # Executar testes
npm run test:cov      # Testes com coverage
npm run ci:test       # Pipeline completo
```

<<<<<<< Updated upstream
Esse comando irá inserir dados fictícios (mock) nas tabelas criadas.
=======
## 📊 Endpoints da API

### Posts
- `GET /api/posts` - Listar posts (com paginação)
- `POST /api/posts` - Criar post
- `PUT /api/posts/:id` - Atualizar post
- `DELETE /api/posts/:id` - Deletar post
- `GET /api/posts/search?q=termo` - Buscar posts

### Email
- `POST /api/sendEmail` - Enviar email de contato



## 🔄 Workflow de Desenvolvimento

### **Quando NÃO precisa rebuild:**
- Mudanças no `.env`
- Alterações no `docker-compose.yml`
- Documentação

```bash
docker-compose down
docker-compose up app_dev mysql -d
```

### **Quando PRECISA rebuild:**
- Mudanças no código fonte
- Novas dependências no `package.json`
- Alterações no `Dockerfile`

```bash
docker-compose build app_dev
docker-compose up app_dev mysql -d
```

### **Deploy em produção:**
```bash
docker build -t blog-backend .
docker tag blog-backend seu-usuario/blog-backend:latest
docker push seu-usuario/blog-backend:latest
```


## 🚀 Deploy no Railway

### Deploy direto do GitHub (Recomendado)

1. **Acesse [Railway](https://railway.app)**
2. **Clique em "New Project"**
3. **Selecione "Deploy from GitHub repo"**
4. **Conecte seu repositório**
5. **Configure as variáveis de ambiente:**
   ```
   DB_HOST=seu-host-mysql
   DB_PORT=3306
   DB_USERNAME=seu-usuario
   DB_PASSWORD=sua-senha
   DB_DATABASE=seu-banco
   USER_EMAIL=seu-email@gmail.com
   APP_PASSWORD=sua-senha-app-gmail
   PORT=3001
   NODE_ENV=production
   ```

### Deploy via Docker Hub (Alternativo)

1. **Preparar imagem:**
```bash
docker build -t blog-backend .
docker tag blog-backend seu-usuario/blog-backend:latest
docker login
docker push seu-usuario/blog-backend:latest
```

2. **Deploy:**
- Crie repositório no [Docker Hub](https://hub.docker.com)
- Acesse [Railway](https://railway.app)
- Selecione **"Deploy from Docker image"**
- Use: `seu-usuario/blog-backend:latest`
- Configure as variáveis de ambiente

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request
>>>>>>> Stashed changes
