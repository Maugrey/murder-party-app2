import getDb from '../utils/lowdb.js';

export async function getPersistence(key: string) {
  try {
    const db = getDb();
    await db.read();
    
    // Ensure db.data exists
    if (db.data === null) {
      db.data = {};
    }
    
    return db.data[key] || null;
  } catch (error) {
    console.error(`Error getting persistence data for key "${key}":`, error);
    throw error;
  }
}

export async function setPersistence(key: string, data: any) {
  try {
    const db = getDb();
    await db.read();
    
    // Ensure db.data exists
    if (db.data === null) {
      db.data = {};
    }
    
    db.data[key] = data;
    await db.write();
    
    console.log(`Successfully stored data for key "${key}"`);
    return true;
  } catch (error) {
    console.error(`Error setting persistence data for key "${key}":`, error);
    throw error;
  }
}
