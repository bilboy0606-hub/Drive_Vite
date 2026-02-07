# 🚀 Prêt pour o2switch!

Votre application Google Drive Clone en React + Vite est maintenant **100% prête** à être déployée sur o2switch.

## 📦 Structure du Projet

```
GoogleDriveClone-Vite/
├── dist/                      ← Dossier à uploader (React compilé)
├── api/                       ← Dossier à uploader (Backend PHP)
├── src/                       ← Code source React (à garder local)
├── node_modules/              ← À NE PAS uploader
├── README.md                  ← Informations du projet
├── DEPLOYMENT.md              ← Instructions détaillées de déploiement
├── schema.sql                 ← Schéma de la BD
└── package.json               ← Dépendances npm
```

## ✅ Étapes de Déploiement

### 1️⃣ Uploader sur o2switch

Via FileZilla ou gestionnaire de fichiers o2switch:

**A. Uploader le dossier `dist/` vers `/public_html/`**
```
public_html/
├── index.html
└── assets/
    ├── *.css
    └── *.js
```

**B. Uploader le dossier `api/` au même endroit**
```
public_html/
├── api/
│   ├── auth/
│   ├── drive/
│   ├── files/
│   ├── folders/
│   ├── uploads/
│   ├── config.php
│   └── .htaccess
```

### 2️⃣ Créer la base de données

1. Aller dans phpMyAdmin o2switch
2. Créer une nouvelle BD: `kota1639_drive`
3. Importer le fichier `schema.sql`

**OU via terminal:**
```bash
mysql -h 109.234.167.182 -u kota1639 -p kota1639_drive < schema.sql
```

### 3️⃣ Permissions des dossiers

```bash
chmod 755 public_html/api/uploads
chmod 755 public_html/api
```

### 4️⃣ Vérifier le .htaccess

Un fichier `.htaccess` est déjà créé dans `api/uploads/` pour bloquer les PHP.

## 🔍 Test de Fonctionnement

1. Accédez à: `https://votredomaine.com/`
2. Créez un compte (register)
3. Connectez-vous
4. Testez l'upload de fichiers
5. Testez la création de dossiers

## 📋 Checklist avant déploiement

- [ ] Uploader `dist/` sur o2switch
- [ ] Uploader `api/` sur o2switch
- [ ] Créer la BD avec `schema.sql`
- [ ] Vérifier les permissions (755)
- [ ] Vérifier que `api/config.php` a les bonnes credentials
- [ ] Tester la connexion
- [ ] Tester l'upload
- [ ] Vérifier que les fichiers s'enregistrent en BD

## 🛠️ Troubleshooting

### 403 Forbidden
- Vérifier les permissions des dossiers
- Vérifier que `.htaccess` est correct

### 404 sur les endpoints API
- Vérifier que les dossiers `api/auth/`, `api/drive/`, etc. existent
- Vérifier les chemins fichiers

### Erreur de connexion BD
- Vérifier `api/config.php` avec les credentials
- Vérifier que la BD existe en phpMyAdmin

### Files uploadés ne s'enregistrent pas
- Vérifier que `api/uploads/` existe et est writeable (755)
- Vérifier l'espace disque disponible

## 📱 Stack Technologique

**Frontend:**
- React 18.2.0
- Vite 5.0.0 (compilation rapide)
- TypeScript 4.x
- Tailwind CSS 3.3.6
- Zustand (state management)
- Lucide React (icons)

**Backend:**
- PHP 7.4+
- MySQL 5.7+
- Sessions PHP (sécurité)

**Déploiement:**
- o2switch (hébergement)
- FTP/SFTP (upload)

## 📝 Fichiers Importants

| Fichier | Rôle |
|---------|------|
| `dist/` | Frontend compilé |
| `api/config.php` | Configuration BD |
| `api/auth/` | Endpoints d'authentification |
| `api/drive/` | Endpoints D'listes |
| `api/files/` | Endpoints d'upload/delete |
| `api/folders/` | Endpoints de création |
| `schema.sql` | Création des tables BD |

## 🎯 Après le déploiement

1. Tester tous les endpoints
2. Monitorer les logs `error_log`
3. Vérifier l'espace disque
4. Sauvegarder régulièrement la BD

## 🔐 Sécurité

- Les mots de passe sont hashés avec `password_hash()`
- Les sessions PHP gèrent l'authentification
- Les fichiers en `api/uploads/` ne peuvent pas être exécutés (`.htaccess`)
- Les inputs sont validés et échappés

---

**Besoin d'aide?** Consultez `DEPLOYMENT.md` pour plus de détails!
