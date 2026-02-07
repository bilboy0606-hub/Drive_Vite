# 📁 Déploiement sur o2switch

Voici exactement ce que vous devez faire:

## 1️⃣ Préparer l'upload

Votre projet est maintenant prêt à être uploadé sur o2switch. Vous avez deux dossiers clés:

### `dist/` - Frontend React compilé
```
dist/
├── index.html
├── assets/
│   ├── index-*.css
│   └── index-*.js
```
**À uploader vers:** `/public_html/` ou `/www/`

### `api/` - Backend PHP
```
api/
├── auth/           (login, register, logout, check)
├── drive/          (list fichiers)
├── files/          (upload, delete)
├── folders/        (create)
├── config.php      (BD config)
└── uploads/        (fichiers uploadés)
```
**À uploader vers:** Même endroit que `dist/` ou parent directe

## 2️⃣ Fusionner les dossiers sur o2switch

Structure finale sur o2switch:
```
public_html/
├── index.html
├── assets/
│   ├── index-*.css
│   └── index-*.js
├── api/
│   ├── auth/
│   ├── drive/
│   ├── files/
│   ├── folders/
│   ├── config.php
│   └── uploads/
```

## 3️⃣ Créer la base de données

1. Ouvrir phpMyAdmin sur o2switch
2. Créer une nouvelle base: `kota1639_drive`
3. Importer le fichier `schema.sql`:
   - Copier le contenu de `schema.sql` du projet
   - Coller dans phpMyAdmin → Onglet SQL
   - Exécuter

**OU** utiliser le terminal pour importer:
```bash
mysql -h 109.234.167.182 -u kota1639 -p kota1639_drive < schema.sql
```

## 4️⃣ Dossier uploads

Assurez-vous que le dossier `api/uploads/` a les permissions 755:
```bash
chmod -R 755 public_html/api/uploads
```

## 5️⃣ C'est fait! 🎉

- Accédez à: `https://votredomaine.com/`
- Le frontend React chargera
- Les appels API iron vers `/api/*` fonctionneront

## 🔧 En cas de problème

### Les appels API retournent 403/404
- Vérifier la permission des fichiers PHP
- Vérifier que les dossiers `api/auth`, `api/drive`, etc. existent

### Connexion BD échoue
- Vérifier les credentials dans `api/config.php`
- Vérifier que la Base existe en phpMyAdmin
- Vérifier que l'utilisateur `kota1639` a les permissions

### Les fichiers uploadés ne s'enregistrent pas
- Que `uploads/` existe et est accessible
- Permissions: `chmod 755 api/uploads`
- Espace disque disponible

## 📝 Notes

- Le schema.sql crée les tables users, folders, files
- Session PHP gère l'authentification (cookies)
- Les fichiers uploadés sont stockés dans `api/uploads/`
- Maximum 5GB par fichier
- Total: 15GB par utilisateur
