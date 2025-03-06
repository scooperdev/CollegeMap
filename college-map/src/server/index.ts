import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import { dbConfig } from '../db/config.mts';

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.get('/api/search/:term', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      `SELECT r.*, b.name as building_name 
       FROM rooms r
       JOIN buildings b ON r.building_id = b.id
       WHERE r.room_number LIKE ? OR r.room_name LIKE ?`,
      [`%${req.params.term}%`, `%${req.params.term}%`]
    );
    await connection.end();
    res.json(rows[0] || null);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});