# Quickstart

## Installation local (Dev)

### Prérequis
- Node.js 16+ 
- PHP 7.4+
- MySQL (o2switch ou local)

### Setup

```bash
# 1. Installer les dépendances
npm install

# 2. Modifier api/config.php si besoin
# (credentials o2switch sont déjà configurées)

# 3. Lancer le dev server
npm run dev

# 4. Dans un autre terminal, lancer PHP
cd api
php -S localhost:8000

# 5. Ouvrir http://localhost:5173
```

## Build pour o2switch

```bash
# Générer dist/
npm run build

# Uploader dist/ et api/ sur o2switch via FTP
```

## Structure des fichiers

```
src/
├── App.tsx                    # App principal
├── store.ts                   # État global Zustand
├── utils.ts                   # Utilitaires
├── index.css                  # Tailwind
├── main.tsx                   # Point d'entrée
├── components/
│   ├── Header.tsx             # Barre du haut
│   ├── Sidebar.tsx            # Menu gauche  
│   ├── DriveContent.tsx       # Contenu principal
│   ├── FileUploadArea.tsx     # Dialog d'upload
│   └── CreateFolderDialog.tsx # Dialog création dossier
└── pages/
    └── AuthPage.tsx           # Login/Register

api/
├── config.php                 # Configuration BD
├── auth/
│   ├── login.php              # POST login
│   ├── register.php           # POST register
│   ├── logout.php             # POST logout
│   └── check.php              # GET vérif auth
├── drive/
│   └── list.php               # GET lister fichiers
├── files/
│   ├── upload.php             # POST upload
│   └── delete.php             # DELETE supprimer
├── folders/
│   └── create.php             # POST créer dossier
└── uploads/                   # Fichiers uploadés
```

## Endpoints API

### Auth
- `POST /api/auth/login.php` → Login
- `POST /api/auth/register.php` → Créer compte
- `POST /api/auth/logout.php` → Logout
- `GET /api/auth/check.php` → Vérifier session

### Drive
- `GET /api/drive/list.php?path=/` → Lister fichiers

### Files
- `POST /api/files/upload.php` → Upload fichier
- `DELETE /api/files/delete.php?id=123` → Supprimer

### Folders
- `POST /api/folders/create.php` → Créer dossier

## Database

Tables:
- `users` (id, username, email, password_hash, folder_name)
- `files` (id, user_id, file_name, file_path, file_size, mime_type, folder, uploaded_at)
- `folders` (id, user_id, folder_name, parent_path, created_at)

## Déploiement final

```bash
# 1. Build
npm run build

# 2. Via FTP, uploader:
#    - Tout le contenu de dist/ → /public_html/
#    - Tout le contenu de api/ → /public_html/api/

# 3. En phpMyAdmin:
#    - Créer BD kota1639_drive
#    - Importer schema.sql

# 4. Test
#    - Aller à https://votredomaine.com
#    - S'enregistrer
#    - Se connecter
#    - Upload un fichier
```

Voilà! C'est prêt 🎉
