import express from 'express';
import cors from 'cors';
import apiRouter from './api/index.js';

const app = express();

// Ajout du middleware CORS pour autoriser le front-end
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Point d'entrée pour toutes les routes API
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
