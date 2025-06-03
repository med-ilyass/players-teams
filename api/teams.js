import express from 'express';
import {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam
} from '../db/queries/teams.js';

const router = express.Router();

// GET /teams – Get all teams
router.get('/', async (req, res, next) => {
  try {
    const teams = await getAllTeams();
    res.json(teams);
  } catch (err) {
    next(err);
  }
});

// GET /teams/:id – Get team by ID
router.get('/:id', async (req, res, next) => {
  try {
    const team = await getTeamById(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json(team);
  } catch (err) {
    next(err);
  }
});

// POST /teams – Create a new team
router.post('/', async (req, res, next) => {
  try {
    const { name, city, coach, founded_year } = req.body;
    if (!name || !city) {
      return res.status(400).json({ error: 'Missing required fields: name and city' });
    }

    const newTeam = await createTeam({ name, city, coach, founded_year });
    res.status(201).json(newTeam);
  } catch (err) {
    next(err);
  }
});

// PUT /teams/:id – Update a team
router.put('/:id', async (req, res, next) => {
  try {
    const { name, city, coach, founded_year } = req.body;
    if (!name || !city) {
      return res.status(400).json({ error: 'Missing required fields: name and city' });
    }

    const updatedTeam = await updateTeam(req.params.id, { name, city, coach, founded_year });
    if (!updatedTeam) return res.status(404).json({ error: 'Team not found' });

    res.json(updatedTeam);
  } catch (err) {
    next(err);
  }
});

// DELETE /teams/:id – Delete a team
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedTeam = await deleteTeam(req.params.id);
    if (!deletedTeam) return res.status(404).json({ error: 'Team not found' });
    res.json({ message: 'Team deleted successfully', team: deletedTeam });
  } catch (err) {
    next(err);
  }
});

export default router;