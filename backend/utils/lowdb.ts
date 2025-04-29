import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import fs from 'fs'

// Type de la structure de données (clé dynamique)
type Data = {
  [key: string]: any
}

// Define database directory and file path
const dbDir = path.join(process.cwd(), '..', 'data')
const dbPath = path.join(process.cwd(), 'backend', 'data', 'db.json');


// Ensure database directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
  console.log(`Created database directory: ${dbDir}`)
}

// Create db.json if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({}))
  console.log(`Created empty database file: ${dbPath}`)
}

// Singleton instance
let dbInstance: Low<Data> | null = null

// Initialisation de LowDB avec un fichier de stockage
export default function getDb() {
  if (!dbInstance) {
    const adapter = new JSONFile<Data>(dbPath)
    dbInstance = new Low<Data>(adapter, {})
  }
  return dbInstance
}
