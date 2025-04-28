import { Router, Request, Response } from 'express';
import { getTestMessage } from '../services/testService.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: getTestMessage() });
});

export default router;
