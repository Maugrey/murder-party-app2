# MurderPartyApp

Base technique pour une application de murder party.

## Stack technique
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Zustand
- i18next + react-i18next

## Structure modulaire
- `src/components/` : composants UI réutilisables
- `src/pages/` : pages principales (Home, Interrogate, Search, Pensieve, Shop, Admin)
- `src/hooks/` : hooks personnalisés
- `src/stores/` : stores Zustand (état global)
- `src/utils/` : utilitaires (persistance, helpers)
- `src/i18n/` : configuration et fichiers de traduction (fr.json, en.json)
- `src/data/` : données de jeu au format JSON

## Fonctionnalités de base
- Layout global avec menu sticky responsive et timer global
- Routing React Router DOM
- Système multilingue (français/anglais)
- Persistance des états via helpers (localStorage, architecture évolutive)

## Démarrage
1. Installer les dépendances :
   ```sh
   npm install
   ```
2. Lancer le serveur de développement :
   ```sh
   npm run dev
   ```

## Configuration de l'environnement

Avant de lancer l'application, créez un fichier `.env` à la racine du projet avec les variables suivantes :

```
VITE_DATA_LOADER_MODE=static
VITE_DATA_LOADER_API_BASE_URL=/api
```

- `VITE_DATA_LOADER_MODE` permet de choisir la source de chargement des données :
  - `static` : les données sont chargées depuis les fichiers JSON du dossier `public/data/`.
  - `api` : les données sont chargées via des endpoints API (si disponibles).
- `VITE_DATA_LOADER_API_BASE_URL` permet de paramétrer l'URL de base de l'API utilisée pour charger les fichiers JSON en mode API. Par défaut `/api`, mais vous pouvez la remplacer par l'URL de votre backend (ex : `http://localhost:3000/api`).

Le fichier `.env` est ignoré par git pour permettre à chaque développeur d'utiliser sa propre configuration locale.

## À venir
- Composants métier et logique de jeu
- Intégration API (optionnelle)
- Améliorations UI/UX

---

*Projet généré le 23 avril 2025*
