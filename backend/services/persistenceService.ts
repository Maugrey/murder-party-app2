import getDb from '../utils/lowdb.js';

export async function getPersistence(key: string) {
  const db = getDb();
  await db.read();
  return db.data?.[key] ?? null;
}

export async function setPersistence(key: string, data: any) {
  const db = getDb();
  await db.read();
  db.data = db.data || {};
  db.data[key] = data;
  await db.write();
}
