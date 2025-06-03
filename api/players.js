import express from "express";

import {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer
} from '../db/queries/players.js';

const router = express.Router();

// GET /players – Get all players
router.get("/", async (req, res, next) => {
  try {
    const players = await getAllPlayers();
    res.json(players);
  } catch (error) {
    next(error);
  }
});

// GET /players/:id – Get player by ID
router.get("/:id", async (req, res, next) => {
  try {
    const player = await getPlayerById(req.params.id);
    if (!player) return res.status(404).json({ error: "Player not found!" });
    res.json(player);
  } catch (error) {
    next(error);
  }
});

// POST /players – Create a player
router.post("/", async (req, res, next) => {
  try {
    console.log("Incoming body:", req.body); // <== log the input

    const { name, position, number, age, team_id } = req.body;

    if (!name || !position || !number || !age) {
      return res.status(400).json({
        error: "Missing required fields: name, position, number, age",
      });
    }

    const newPlayer = await createPlayer({
      name,
      position,
      number,
      age,
      team_id,
    });

    res.status(201).json(newPlayer);
  } catch (error) {
    console.error("POST /players failed:", error); // <== log actual error
    next(error);
  }
});

// PUT /players/:id – Update a player
router.put("/:id", async (req, res, next) => {
  try {
    const { name, position, number, age, team_id } = req.body;
    if (!name || !position || !number || !age) {
      return res.status(400).json({
        error: "Missing required fields: name, position, number, age",
      });
    }

    const updatedPlayer = await updatePlayer(req.params.id, {
      name,
      position,
      number,
      age,
      team_id,
    });

    if (!updatedPlayer)
      return res.status(404).json({ error: "Player not found to update!" });

    res.json(updatedPlayer);
  } catch (error) {
    next(error);
  }
});

// DELETE /players/:id – Delete a player
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedPlayer = await deletePlayer(req.params.id);
    if (!deletedPlayer)
      return res.status(404).json({ error: "Player not found to delete!" });

    res.json({ message: "Player deleted successfully", player: deletedPlayer });
  } catch (error) {
    next(error);
  }
});

export default router;