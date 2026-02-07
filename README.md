# React + Vite Google Drive Clone

Voici votre nouveau projet structure comme votre site de chaussures:

```
GoogleDriveClone-Vite/
├── dist/               ← À uploader sur o2switch (après npm run build)
├── src/                ← Code React
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
├── api/                ← À uploader aussi sur o2switch
│   ├── auth/
│   │   ├── login.php
│   │   ├── register.php
│   │   ├── logout.php
│   │   └── check.php
│   ├── drive/
│   │   └── list.php
│   ├── folders/
│   │   └── create.php
│   ├── files/
│   │   ├── upload.php
│   │   └── delete.php
│   ├── config.php      ← Config BD
│   └── uploads/        ← Fichiers uploadés
├── package.json
├── vite.config.ts
└── index.html
```

## 🚀 Installation & Build

```bash
# Installer
npm install

# Dev
npm run dev

# Build
npm run build
```

## 📦 Upload sur o2switch

Après `npm run build`, uploadez via FTP:

```
dist/                  (contenu complet)
api/                   (contenu complet)
```

Et c'est tout! Pas besoin de npm, npm start, rien.

## DB

Même config que avant:
- Host: 109.234.167.182
- User: kota1639
- Password: 5LKQ-WA6b-FSz#
- Database: kota1639_drive
