import { Router, Request, Response, NextFunction } from 'express';
import { getPersistence, setPersistence } from '../services/persistenceService.js';

const router = Router();

// GET /persistence/:key : lire la valeur de persistance pour une clé
router.get('/:key', (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const key = req.params.key;
      if (!key) {
        return res.status(400).json({ error: 'Missing key parameter' });
      }
      const data = await getPersistence(key);
      res.json({ data });
    } catch (err) {
      next(err);
    }
  })();
});

// PUT /persistence/:key : écrire/modifier la valeur de persistance pour une clé
router.put('/:key', (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const key = req.params.key;
      const data = req.body;
      if (!key) {
        return res.status(400).json({ error: 'Missing key parameter' });
      }
      await setPersistence(key, data);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  })();
});

export default router;
