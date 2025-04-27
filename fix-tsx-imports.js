// Ce script corrige les imports avec extension .tsx en les remplaçant par .js
// Pour résoudre l'erreur "An import path can only end with a '.tsx' extension when 'allowImportingTsExtensions' is enabled"

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dossiers à parcourir
const directories = [
  path.join(__dirname, 'src'),
  path.join(__dirname, 'src/pages'),
  path.join(__dirname, 'src/components'),
  path.join(__dirname, 'src/utils')
];

// Corriger les imports avec extension .tsx
const fixTsxImports = (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.jsx') && !filePath.endsWith('.ts')) return;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Remplace les imports avec .tsx par .js
    const updatedContent = content.replace(/from\s+['"](.+)\.tsx['"]/g, "from '$1.js'");
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Imports corrigés dans: ${filePath}`);
    } else {
      console.log(`⏭️ Aucun import à corriger dans: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Erreur pour ${filePath}:`, error);
  }
};

// Parcourir tous les fichiers des répertoires spécifiés
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`Le répertoire ${dir} n'existe pas.`);
    return;
  }
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile()) {
      fixTsxImports(filePath);
    }
  });
});

console.log('Script terminé!');