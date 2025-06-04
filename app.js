import express from 'express';
import playersRouter from './api/players.js';
import teamsRouter from './api/teams.js'; // when ready
import authRoutes from './api/auth.js';

const app = express();

app.use(express.json());
app.use('/players', playersRouter);
app.use('/teams', teamsRouter); // placeholder
app.use('/auth', authRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});


export default app;