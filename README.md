# Appwrite Backup & Migration 🚀

This repository contains scripts to **export** and **import** Appwrite database schemas and data.

## 🎯 Features

✅ Export and import Appwrite database schema 
✅ Backup and restore database records 
✅ Automated scripts using Node.js 

## 📌 How to Use

1. Install Dependencies

```sh
npm install node-appwrite --save
```

2. Export Database Schema
```sh
node export-schema.js
```

3. Import Database Schema
```sh
node import-schema.js
```

4. Export Data
```sh
node export-data.js
```

5. Import Data
```sh
node import-data.js
```

## ⚙️ Configuration

Before running the scripts, update your **Appwrite API credentials inside the JavaScript files**.

### Required Configurations

You need to replace the placeholders with your actual Appwrite credentials in the scripts:

```javascript
const client = new sdk.Client()
  .setEndpoint('http://your-appwrite-server/v1') // 🔹 Your Appwrite server URL
  .setProject('your_project_id') // 🔹 Replace with your Appwrite project ID
  .setKey('your_api_key'); // 🔹 Replace with your Appwrite API Key

const databaseId = 'your_database_id'; // 🔹 Replace with your Database ID
const collectionId = 'your_collection_id'; // 🔹 Replace with your Collection ID
```

Additionally, some scripts require further modifications, including:

- JSON file paths (e.g., for backups and imports)
- targetCollectionId (e.g., if importing into a different collection)
- backupDatabaseId (e.g., if backing up to a different database)
......

✨ These additional configurations are explained in the respective JavaScript files as comments.
🔍 Before running any script, check the file and modify these values accordingly.
