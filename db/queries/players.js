import db from "../client.js";

export async function getAllPlayers() {
  const result = await db.query("SELECT * FROM players");
  return result.rows;
}

export async function getPlayerById(id) {
  const result = await db.query("SELECT * FROM players where id = $1;", [id]);
  return result.rows[0];
}
export async function createPlayer({ name, position, number, age, team_id }) {
  const result = db.query(
    `INSERT INTO players (name, position, number, age, team_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `,
    [name, position, number, age, team_id]
  );
}

export async function updatePlayer(id, { name, position, number, age, team_id }) {
  const result = await db.query(
    `UPDATE players
        SET name = $1,
        position = $2,
        number = $3,
        age = $4,
        team_id = $5
        WHERE id = $6
        RETURNING *;
        `,
    [name, position, number, age, team_id]
  );
  return result.rows[0];
}

export async function deletePlayer(id) {
  const result = db.query(
    `
        DELETE FROM players WHERE id = $1 RETURNING *;
        `,
    [id]
  );
  return result.rows[0];
}

