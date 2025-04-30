import { getPersistence, setPersistence } from '../backend/services/persistenceService.js';

export default async function handler(req, res) {
  // Extraire le paramètre clé de l'URL
  const key = req.query.key || req.url.split('/').pop();
  
  if (!key) {
    return res.status(400).json({ error: 'Missing key parameter' });
  }

  try {
    // Gérer les différentes méthodes HTTP
    if (req.method === 'GET') {
      // Traiter la requête GET
      const data = await getPersistence(key);
      return res.status(200).json(data);
    } 
    else if (req.method === 'PUT' || req.method === 'POST') {
      // Traiter la requête PUT/POST
      const data = req.body;
      await setPersistence(key, data);
      return res.status(200).json({ success: true });
    } 
    else {
      // Méthode non supportée
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in persistence handler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}