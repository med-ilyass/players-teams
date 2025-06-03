import db from '../client.js';

// GET all teams
export async function getAllTeams() {
  const result = await db.query('SELECT * FROM teams ORDER BY id');
  return result.rows;
}

// GET one team by ID
export async function getTeamById(id) {
  const result = await db.query('SELECT * FROM teams WHERE id = $1', [id]);
  return result.rows[0];
}

// CREATE a new team
export async function createTeam({ name, city, coach, founded_year }) {
  const result = await db.query(
    `INSERT INTO teams (name, city, coach, founded_year)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, city, coach, founded_year]
  );
  return result.rows[0];
}

// UPDATE a team by ID
export async function updateTeam(id, { name, city, coach, founded_year }) {
  const result = await db.query(
    `UPDATE teams
     SET name = $1,
         city = $2,
         coach = $3,
         founded_year = $4
     WHERE id = $5
     RETURNING *`,
    [name, city, coach, founded_year, id]
  );
  return result.rows[0];
}

// DELETE a team by ID
export async function deleteTeam(id) {
  const result = await db.query('DELETE FROM teams WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}