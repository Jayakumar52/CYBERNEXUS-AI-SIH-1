import express from 'express';
import { apiRouter } from './routes/apiRoutes.js';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());

// Enable CORS for local cross-port dev if frontend runs separately
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

// Mount REST API endpoints
app.use('/api', apiRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CYBERNEXUS AI Backend Decision Engine',
    timestamp: new Date().toISOString(),
    environment: 'SIH Prototype / Nexa Financial Services'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[CYBERNEXUS Backend] REST API Server running on http://0.0.0.0:${PORT}`);
});

export default app;
