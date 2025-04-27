// Ce script ajoute l'import React à tous les composants React
// Pour résoudre l'erreur "React refers to a UMD global, but the current file is a module"

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

// Ajouter l'import React à un fichier s'il n'existe pas déjà
const addReactImport = (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.jsx')) return;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Vérifie si l'import React existe déjà
    if (!content.includes('import React') && !content.includes('import * as React')) {
      // Ajoute l'import React au début du fichier
      const updatedContent = `import React from 'react';\n${content}`;
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Import React ajouté à: ${filePath}`);
    } else {
      console.log(`⏭️ Import React existant dans: ${filePath}`);
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
      addReactImport(filePath);
    }
  });
});

console.log('Script terminé!');