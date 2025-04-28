import getDb from '../utils/lowdb.js';

export async function getPersistence() {
  const db = getDb();
  await db.read();
  return db.data?.data ?? null;
}

export async function setPersistence(data: any) {
  const db = getDb();
  await db.read();
  db.data = { data };
  await db.write();
}
