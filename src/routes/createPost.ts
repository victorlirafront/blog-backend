import express from 'express';
import { pool } from '../config/db';

const router = express.Router();

router.post('/create', async (req: any, res: any) => {
  const { 
    author, 
    title, 
    content, 
    date, 
    category, 
    meta_tag_title, 
    meta_tag_description, 
    post_image, 
    post_background 
  } = req.body;

  const query = `
    INSERT INTO posts (
      title, content, author, date, category, 
      meta_tag_title, meta_tag_description, post_image, post_background
    ) VALUES (?,?,?,?,?,?,?,?,?)
  `;

  const values = [
    title, content, author, date, category, 
    meta_tag_title, meta_tag_description, post_image, post_background
  ];

  try {
    const connection = await pool.getConnection(); // Obtém uma conexão do pool
    const [result] = await connection.query(query, values); // Executa a inserção
    connection.release(); // Libera a conexão de volta ao pool

    console.log('Post criado com sucesso:', result);
    res.status(201).json({ message: 'Post criado com sucesso!', result });

  } catch (err) {
    console.error('Erro ao criar o post:', err);
    res.status(500).json({ message: 'Erro ao criar o post.' });
  }
});
export default router;
