<br/>
<br/>
<br/>

<p align="center">
  <img width="400" src="https://skillicons.dev/icons?i=typescript,nodejs,nestjs,mysql,docker&theme=dark" alt="Java, Spring, Kotlin, GO, Postgres, MySql, MongoDB, Redis, NodeJs, Express, React, NextJs, TailwindCSS">
</p>

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

## 🔄 Desenvolvimento com Docker

### **🚀 Hot Reload (Automático) - OTIMIZADO**

O Docker está configurado com reload automático otimizado para Windows. Para a maioria das alterações, apenas:

1. **Salve o arquivo** (Ctrl+S)
2. **Aguarde 3-5 segundos**
3. **Teste a alteração**

### **🔧 Quando reiniciar:**

#### **Alterações no .env:**

```bash
docker-compose restart app_dev
```

#### **Novas dependências (package.json):**

```bash
docker-compose down
docker-compose build app_dev
docker-compose up app_dev -d
```

#### **Alterações no Dockerfile ou docker-compose.yml:**

```bash
docker-compose down
docker-compose build app_dev
docker-compose up app_dev -d
```

#### **Problemas/travamentos:**

```bash
docker-compose restart app_dev
```

### **🔍 Monitorar logs em tempo real:**

```bash
docker-compose logs app_dev -f
```

### **🐛 Debug se o hot reload não funcionar:**

```bash
# 1. Verificar se o container está rodando
docker ps

# 2. Ver logs para detectar erros
docker-compose logs app_dev --tail=50

# 3. Reiniciar completamente
docker-compose down
docker-compose up app_dev -d

# 4. Monitorar em tempo real
docker-compose logs app_dev -f
```

> **💡 Dica:** Se aparecer `File change detected. Starting incremental compilation...` significa que a mudança foi detectada automaticamente!
>
> **⚡ Performance:** Com as otimizações, o hot reload agora detecta mudanças em 3-5 segundos (antes era 10-15s)

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
- `GET /api/get/:id` - Buscar post por ID
- `GET /api/get/slug/:slug` - Buscar post por slug (rápido, indexado)
- `GET /api/get/search?query=termo` - Buscar posts por termo
- `GET /api/get/author/:author` - Buscar posts por autor
- `GET /api/get/category/:category` - Buscar posts por categoria
- `POST /api/get` - Criar post
- `PUT /api/get/:id` - Atualizar post
- `DELETE /api/get/:id` - Deletar post

### Email

- `POST /api/sendEmail` - Enviar email de contato

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request
