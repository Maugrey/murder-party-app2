import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createServer() {
  const app = express();

  let vite;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist/client')));
  }

  // Simple middleware for all routes, avoiding router issues
  app.use(async (req, res) => {
    try {
      const url = req.originalUrl;
      
      if (!isProd) {
        // En mode développement, utiliser le fichier index.html à la racine du projet
        const indexPath = path.resolve(process.cwd(), 'index.html');
        console.log(`Loading template from: ${indexPath}`);
        
        if (!fs.existsSync(indexPath)) {
          throw new Error(`Template file not found: ${indexPath}`);
        }
        
        const template = fs.readFileSync(indexPath, 'utf-8');
        const transformedTemplate = await vite.transformIndexHtml(url, template);
        
        // Chargement du entry-server et rendu de l'application avec React et JSX
        // Note: Nous utilisons entry-server.tsx au lieu de entry-server.ts
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
        const appHtml = render(url);
        
        // Injecter le HTML de l'App dans le template
        const html = transformedTemplate.replace('<!--ssr-outlet-->', appHtml);
        
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } else {
        // En production, utiliser le fichier index.html généré par le build
        const clientDistPath = path.resolve(process.cwd(), 'dist/client');
        const indexPath = path.resolve(clientDistPath, 'index.html');
        console.log(`Loading template from: ${indexPath}`);
        
        if (!fs.existsSync(indexPath)) {
          throw new Error(`Template file not found: ${indexPath}`);
        }
        
        const template = fs.readFileSync(indexPath, 'utf-8');
        const { render } = await import('./dist/server/entry-server.js');
        const appHtml = render(url);
        
        // Injecter le HTML de l'App dans le template
        const html = template.replace('<!--ssr-outlet-->', appHtml);
        
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      }
    } catch (e) {
      console.error(e);
      res.status(500).end(`Server Error: ${e.message}`);
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
