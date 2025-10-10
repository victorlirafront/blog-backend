-- Criar banco de dados se não existir
CREATE DATABASE IF NOT EXISTS blog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar o banco de dados
USE blog_db;

-- Garantir que o usuário root pode conectar de qualquer host (apenas para desenvolvimento/homologação)
-- Em produção, use um usuário específico com permissões limitadas

