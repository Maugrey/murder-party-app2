import { getTestMessage } from '../backend/services/testService.js';


export default function(req, res)  {
  res.json({ message: getTestMessage() });
}
