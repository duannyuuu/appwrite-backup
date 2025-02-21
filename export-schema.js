const sdk = require('node-appwrite')
const fs = require('fs')

// configure info
const API_ENDPOINT = "http://localhost/v1" // change to your API endpoint
const PROJECT_ID = " " // change to your project ID
const API_KEY = " " // change to your API key
const DATABASE_ID = " " // change to your database ID

// initialize the client
const client = new sdk.Client()
  .setEndpoint(API_ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY)

// initialize the database service
const databases = new sdk.Databases(client)

/**
 * Get the collection information of the specified database
 */
async function getCollections(databaseId) {
  try {
    const response = await databases.listCollections(databaseId)
    return response.collections || []
  } catch (error) {
    console.error("Failed to get the collection:", error.message)
    return []
  }
}

/**
 * Export the schema of the specified database and save it as a JSON file
 */
async function exportSchemaToJson() {
  const collections = await getCollections(DATABASE_ID)
  if (collections.length > 0) {
    // get the current date
    const timestamp = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0]
    const filename = `Schema_${timestamp}.json`
    // save JSON file
    fs.writeFileSync(filename, JSON.stringify(collections, null, 4), 'utf-8')
    console.log(`The schema of Database ID: ${DATABASE_ID} has been successfully exported to the file: ${filename}`)

  } else {
    console.log("No collection data was obtained!")
  }
}

exportSchemaToJson()
