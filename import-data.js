const sdk = require('node-appwrite')
const fs = require('fs')

// configure info
const API_ENDPOINT = "http://localhost/v1" // change to your API endpoint
const PROJECT_ID = " " // change to your project ID
const API_KEY = " " // change to your API key

// initialize Appwrite client
const client = new sdk.Client()
  .setEndpoint(API_ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY)
// .setSelfSigned(true)

const databases = new sdk.Databases(client)

// change to your JSON file name
const data = JSON.parse(fs.readFileSync('data_2025-02-14_08-00-49.json', 'utf8'));

(async () => {
  try {
    const backupDatabaseId = ' ' // change to your database ID
    const targetCollectionId = ' ' // change to your collection ID

    console.log('Starting data import...')
    for (const document of data) {
      // remove system fields
      const sanitizedDocument = { ...document }
      delete sanitizedDocument['$id']
      delete sanitizedDocument['$databaseId']
      delete sanitizedDocument['$collectionId']
      delete sanitizedDocument['$createdAt']
      delete sanitizedDocument['$updatedAt']
      delete sanitizedDocument['$permissions']

      await databases.createDocument(
        backupDatabaseId,
        targetCollectionId,
        sdk.ID.unique(),
        sanitizedDocument,
      )
    }
    console.log(`Successfully imported ${data.length} docs into collection ${targetCollectionId}`)

  } catch (error) {
    console.error('Failed to import:', error)
  }
})();
