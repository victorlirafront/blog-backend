import { pool } from '../config/db';
import express from 'express';
import paginatedResults from '../helper/pagination';

const router = express.Router();

router.get('/get', async (req: any, res: any) => {
  const category: string = String(req.query.category) || 'all';

  try {
    const connection = await pool.getConnection();
    
    let query = 'SELECT * FROM posts';
    let params: any[] = [];

    if (category !== 'all' && category) {
      query += ' WHERE category = ?';
      params = [category];
    }
    
    const [result] = await connection.query(query, params);
    connection.release();

    paginatedResults(result)(req, res, () => {
      res.json(res.paginatedResults);
    });

  } catch (err) {
    console.error('Erro ao buscar posts:', err);
    res.status(500).json({ message: 'Erro ao buscar posts.' });
  }
});

export default router;
