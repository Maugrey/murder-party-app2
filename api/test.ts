import { Request, Response } from 'express';
import { getTestMessage } from '../backend/services/testService.js';


export default function(req: Request, res: Response)  {
  res.json({ message: getTestMessage() });
}
