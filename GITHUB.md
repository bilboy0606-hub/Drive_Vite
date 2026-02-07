# Push sur GitHub (Optionnel)

Si vous voulez sauvegarder votre projet sur GitHub:

## 1. Créer un repo sur GitHub

1. Aller sur https://github.com/new
2. Créer un repo: `GoogleDriveClone-Vite`
3. **Ne pas** initialiser avec README (nous en avons déjà)

## 2. Pousser le code

```bash
# Dans le dossier GoogleDriveClone-Vite
cd "c:\Users\loanj\Desktop\GoogleDriveClone-Vite"

# Ajouter le remote
git remote add origin https://github.com/VOTRE_USERNAME/GoogleDriveClone-Vite.git

# Push
git branch -M main
git push -u origin main
```

## 3. Résultat

Votre repo GitHub contiendra:
- Tout le code source (src/)
- Configuration (vite, tailwind, tsconfig)
- Backend PHP (api/)
- Documentation (README, DEPLOYMENT, etc)
- **Pas** les dossiers node_modules/ et dist/ (ils sont dans .gitignore)

## 4. Cloner plus tard

Pour cloner le projet:
```bash
git clone https://github.com/VOTRE_USERNAME/GoogleDriveClone-Vite.git
cd GoogleDriveClone-Vite
npm install
npm run build
```

---

**Note:** Le repo GitHub est un backup. Le déploiement sur o2switch ne dépend pas de GitHub.
