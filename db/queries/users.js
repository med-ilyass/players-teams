import db from '../client.js';

export async function createUser(username, hashedPassword) {
  const result = await db.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
    [username, hashedPassword]
  );
  return result.rows[0];
}

export async function getUserByUsername(username) {
  const result = await db.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );
  return result.rows[0];
}