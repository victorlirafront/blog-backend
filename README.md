
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

---

## ⚙️ Instalação

```bash
npm install
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
npm run start:dev
```

Após iniciar o servidor, o NestJS criará automaticamente as tabelas no banco de dados.

---

## 🌱 Popular o Banco de Dados

```bash
npm run seed
```

Esse comando irá inserir dados fictícios (mock) nas tabelas criadas.
