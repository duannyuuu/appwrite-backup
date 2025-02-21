const sdk = require('node-appwrite')
const fs = require('fs')

// configure info
const API_ENDPOINT = " " // change to your API endpoint
const PROJECT_ID = " " // change to your project ID

// initialize Appwrite client
const client = new sdk.Client()
  .setEndpoint(API_ENDPOINT)
  .setProject(PROJECT_ID)

const databases = new sdk.Databases(client);

(async () => {
  try {
    // change to your database ID and collection ID
    const databaseId = 'your_database_id_here' // replace with your actual database ID
    const collectionId = 'your_collection_id_here' // replace with your actual collection ID

    let allDocuments = []
    let limit = 100 // page size
    let offset = 0 // page offset

    while (true) {
      const response = await databases.listDocuments(databaseId, collectionId, [
        `limit(${limit})`,
        `offset(${offset})`
      ])

      allDocuments.push(...response.documents)

      if (response.documents.length < limit) {
        break
      }
      offset += limit
    }
    // get the current date
    const timestamp = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0]
    const fileName = `data_${timestamp}.json`
    // save JSON file
    fs.writeFileSync(fileName, JSON.stringify(allDocuments, null, 2))
    console.log(`Successfully exported: ${fileName}, total docs: ${allDocuments.length}`)

  } catch (error) {
    console.error('Export failed:', error)
  }
})();
