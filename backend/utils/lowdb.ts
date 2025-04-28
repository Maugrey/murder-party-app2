import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// Type de la structure de données (clé dynamique)
type Data = {
  [key: string]: any
}

// Initialisation de LowDB avec un fichier de stockage
export default function getDb() {
  const adapter = new JSONFile<Data>('db.json')
  const db = new Low<Data>(adapter, { })
  return db
}
