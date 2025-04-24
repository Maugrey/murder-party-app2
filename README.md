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

## À venir
- Composants métier et logique de jeu
- Intégration API (optionnelle)
- Améliorations UI/UX

---

*Projet généré le 23 avril 2025*
