# 🐳 Guia Docker - MySQL + NestJS

## 📋 Pré-requisitos

- Docker
- Docker Compose

## 🚀 Como rodar tudo no Docker (MySQL + Backend)

### 1. **Subir MySQL + Backend juntos:**

```bash
# Subir tudo (MySQL + Backend Dev)
docker-compose up mysql app_dev -d

# Ver logs em tempo real
docker-compose logs -f

# Ver apenas logs do backend
docker-compose logs app_dev -f
```

### 2. **Apenas MySQL (para desenvolvimento local):**

```bash
# Apenas o banco de dados
docker-compose up mysql -d

# Backend rodando localmente (fora do Docker)
npm run start:dev
```

### 3. **Conectar ao MySQL:**

```bash
# Via terminal
docker exec -it blog_mysql mysql -u root blog_db

# Via cliente MySQL (DBeaver, MySQL Workbench, etc)
Host: localhost
Port: 3306
User: root
Password: (vazia)
Database: blog_db
```

## 📊 Estrutura

```
docker/
├── mysql/
│   └── init/
│       └── 01-init.sql    # Scripts de inicialização
└── README-DOCKER.md        # Este arquivo
```

## 🔧 Comandos Úteis

```bash
# Parar tudo
docker-compose down

# Parar e remover volumes (CUIDADO: apaga os dados do banco!)
docker-compose down -v

# Rebuild após mudanças no Dockerfile
docker-compose build app_dev

# Ver logs do MySQL
docker-compose logs mysql -f

# Ver logs do Backend
docker-compose logs app_dev -f

# Ver status dos containers
docker-compose ps

# Executar seed (popular banco)
docker-compose run --rm seed

# Backup do banco
docker exec blog_mysql mysqldump -u root blog_db > backup.sql

# Restaurar banco
docker exec -i blog_mysql mysql -u root blog_db < backup.sql

# Reiniciar apenas o backend
docker-compose restart app_dev
```

## 🎯 URLs e Portas

- **Backend API**: http://localhost:3002/api
- **MySQL**: localhost:3306
- **Posts**: http://localhost:3002/api/get
- **Busca por slug**: http://localhost:3002/api/get/slug/:slug

## 📝 Variáveis de Ambiente

O arquivo `.env` **não é necessário** quando usando tudo no Docker, pois as configurações padrão já funcionam:

```env
# Valores padrão (já configurados no docker-compose.yml)
BLOG_HOST=mysql
BLOG_DB_PORT=3306
BLOG_USERNAME=root
BLOG_PASSWORD=
BLOG_DATABASE=blog_db
NODE_ENV=development
```

Se precisar customizar, crie um arquivo `.env` na raiz do projeto.

## 🔍 Troubleshooting

### MySQL não inicia:

```bash
# Ver logs
docker-compose logs mysql

# Remover volume e recriar
docker-compose down -v
docker-compose up mysql -d
```

### Backend não conecta no MySQL:

1. Verifique se o MySQL está healthy: `docker-compose ps`
2. Verifique as variáveis de ambiente: `docker-compose config`
3. Tente reiniciar: `docker-compose restart app_dev`

### Resetar tudo:

```bash
docker-compose down -v
docker-compose up mysql app_dev -d
```
