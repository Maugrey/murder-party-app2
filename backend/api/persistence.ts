import { Router, Request, Response } from 'express';
import { getPersistence, setPersistence } from '../services/persistenceService.js';

const router = Router();

// GET /persistence : lire la valeur de persistance
router.get('/', async (req: Request, res: Response) => {
  const data = await getPersistence();
  res.json({ data });
});

// POST /persistence : écrire la valeur de persistance
router.post('/', async (req: Request, res: Response) => {
  await setPersistence(req.body.data);
  res.json({ success: true });
});

export default router;
