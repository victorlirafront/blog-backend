import { pool } from "../config/db";
import paginatedResults from "../helper/pagination";
import router from "./getProducts";

router.get('/search', async (req: any, res: any) => {
  const query = String(req.query.query) || '';
  const category: string = String(req.query.category) || 'all';

  try {
    const connection = await pool.getConnection(); 

    let sql = 'SELECT * FROM posts WHERE title LIKE ? OR content LIKE ?';
    let params: any[] = [`%${query}%`, `%${query}%`];

    if (category !== 'all' && category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    const [result] = await connection.query(sql, params); 
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
