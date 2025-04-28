import { Router } from 'express';
import testRouter from './test.js';
import persistenceRouter from './persistence.js';

const router = Router();

router.use('/test', testRouter);
router.use('/persistence', persistenceRouter);

export default router;
