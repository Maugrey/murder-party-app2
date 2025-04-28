import express from 'express';
import apiRouter from './api/index.js';

const app = express();
app.use(express.json());

// Point d'entrée pour toutes les routes API
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
