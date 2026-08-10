import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import getLatestYouTubeVideos from './api/youtube/latest';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/soundwebsite', express.static(path.join(process.cwd(), 'public', 'soundwebsite')));

// API Endpoint for YouTube Videos
app.get('/api/youtube/latest', getLatestYouTubeVideos);

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
