# Blog Backend

Blog desenvolvido com Clean Architecture e NestJS, incluindo sistema de posts e envio de emails.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para banco de dados
- **MySQL** - Banco de dados
- **Nodemailer** - Envio de emails
- **Railway** - Deploy e hosting
- **Jest** - Testes unitários

## 📋 Requisitos

### **Para desenvolvimento local:**
- **Node.js** 18+ 
- **XAMPP** (MySQL)
- **Git**

### **Para Docker:**
- **Docker** e **Docker Compose**
- **XAMPP** (MySQL)

## 🛠️ Instalação Local

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd blog-backend
```

2. **Configure as variáveis de ambiente:**
Crie um arquivo `.env` na raiz do projeto:
```env
# development
HOST=localhost
DB_PORT=3306
USERNAME=root
PASSWORD=
DATABASE=blog_db

# Application Configuration
PORT=3001
NODE_ENV=development 

USER_EMAIL=seu-email@gmail.com
APP_PASSWORD=sua-senha-app-gmail
```

3. **Execute o projeto:**

### Opção 1: Localmente (Node.js)
```bash
# 1. Inicie o XAMPP e o MySQL
# 2. Crie o banco 'blog_db' no phpMyAdmin
# 3. Execute a aplicação
npm install
npm run start:dev
```
**Acesse:** `http://localhost:3001/api/get`

### Opção 2: Com Docker + XAMPP
```bash
# 1. Inicie o XAMPP e o MySQL  
# 2. Crie o banco 'blog_db' no phpMyAdmin
# 3. Execute o Docker (apenas a aplicação)
docker-compose up app_dev -d
```
**Acesse:** `http://localhost:3002/api/get`

> **💡 Dica:** Use Docker se quiser isolar a aplicação, ou Node.js direto para desenvolvimento mais rápido.

## 🧪 Testes

```bash
npm test              # Executar testes
npm run test:cov      # Testes com coverage
npm run ci:test       # Pipeline completo
```

## 📊 Endpoints da API

### **Local (Node.js):** `http://localhost:3001/api`
### **Docker:** `http://localhost:3002/api`

### Posts
- `GET /api/get` - Listar posts (com paginação)
- `POST /api/get` - Criar post
- `PUT /api/get/:id` - Atualizar post
- `DELETE /api/get/:id` - Deletar post
- `GET /api/get/search?query=termo` - Buscar posts

### Email
- `POST /api/sendEmail` - Enviar email de contato


## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request
