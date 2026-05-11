# Plan de stabilite et clean code

## Objectif
Rendre le portfolio plus stable en production, reduire les risques de bugs, et garder une base de code claire a maintenir.

## Priorites critiques (a traiter en premier)

1. Service Worker fiable
- Supprimer le pre-cache des chemins `/src/assets/...` (invalide en build).
- Garder une strategie cache runtime pour les images.
- Verifier l'enregistrement et le comportement hors ligne.

2. JSX valide
- Corriger tous les `class=` en `className=` dans les composants React.

3. Nettoyage des listeners DOM
- Eviter les fuites memoire: tous les `addEventListener` doivent avoir leur cleanup.
- Limiter la manipulation directe du DOM aux cas necessaires.

4. Cohherence des noms
- Corriger les fautes de frappe (ex: `Cartograhy` -> `Cartography`).
- Uniformiser les noms de composants pour une lecture simple.

5. Nettoyage git
- Retirer les fichiers `.DS_Store` deja suivis par Git.
- Garder `.DS_Store` dans `.gitignore`.

## Priorites importantes (phase 2)

1. Supprimer le code mort
- Retirer les `useEffect` vides.
- Supprimer ou integrer les composants inutilises (ex: `LanguageSelector`).

2. Stabiliser la navigation
- Remplacer les `setTimeout(..., 100)` utilises pour scroller apres navigation par une logique react fiable.

3. Qualite i18n
- Corriger les traductions FR qui sont encore en anglais.

4. Standards React
- Renommer les composants en PascalCase.
- Eviter `index` comme `key` quand possible.

## Priorites de maintenance (phase 3)

1. Dependance et style
- Retirer les dependances non utilisees.
- Uniformiser la strategie de style (CSS vs styled-components).

2. Robustesse
- Ajouter un Error Boundary global.
- Ajouter PropTypes ou TypeScript.

3. Conformite
- Encadrer Google Analytics avec gestion de consentement.

## Verification a chaque lot

1. Build production
- `npm run build`

2. Verification manuelle
- Navigation entre pages
- Scroll vers sections
- Theme toggle
- Changement de langue
- Chargement images

3. Hygiene repository
- `git status` propre
- Aucun fichier systeme commite
