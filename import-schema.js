const sdk = require('node-appwrite')
const fs = require('fs')

// configure info
const API_ENDPOINT = "http://localhost/v1" // change to your API endpoint
const PROJECT_ID = " " // change to your project ID
const API_KEY = " " // change to your API key
const DATABASE_ID = " " // change to your database ID

// initialize Appwrite client
const client = new sdk.Client()
  .setEndpoint(API_ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY)

// initialize database service
const databases = new sdk.Databases(client)

/**
 * Read JSON file and import Collection Schema
 */
async function importSchemaFromJson(filePath) {
  try {
    // Read JSON file
    const schemaData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    if (!Array.isArray(schemaData)) {
      console.error("Error: JSON file format is incorrect, it should be an array of Collections!")
      return
    }

    console.log(`Importing ${schemaData.length} collections to database ${DATABASE_ID}...`)

    for (const collection of schemaData) {
      const collectionId = collection.$id
      // const collectionId = ID.unique()
      const collectionName = collection.name

      // 1. Create Collection
      console.log(`Creating collection: ${collectionName} (${collectionId}) ...`)
      try {
        await databases.createCollection(DATABASE_ID, collectionId, collectionName)
      } catch (error) {
        console.error(`Failed to create collection ${collectionName}:`, error.message)
        continue
      }

      // 2. Iterate over the attributes of the Collection and create each one
      if (collection.attributes && collection.attributes.length > 0) {
        console.log(`Adding ${collection.attributes.length} attributes to collection ${collectionName}...`)

        for (const attribute of collection.attributes) {
          const { key, type, size, required, default: defaultValue, array } = attribute
          try {
            switch (type) {
              case "string":
                await databases.createStringAttribute(DATABASE_ID, collectionId, key, size || 256, required, defaultValue)
                break
              case "integer":
                await databases.createIntegerAttribute(DATABASE_ID, collectionId, key, required, defaultValue)
                break
              case "boolean":
                await databases.createBooleanAttribute(DATABASE_ID, collectionId, key, required, defaultValue)
                break
              case "email":
                await databases.createEmailAttribute(DATABASE_ID, collectionId, key, required, defaultValue)
                break
              case "float":
                await databases.createFloatAttribute(DATABASE_ID, collectionId, key, required, defaultValue)
                break
              case "datetime":
                await databases.createDatetimeAttribute(DATABASE_ID, collectionId, key, required, defaultValue)
                break
              default:
                console.log(`Skipping unsupported attribute type: ${type} (attribute name: ${key})`)
            }
          } catch (error) {
            console.error(`Failed to add ${key}:`, error.message)
          }
        }
      } else {
        console.log(`Collection ${collectionName} has no attributes, skipping attribute creation.`)
      }
    }
    console.log("successfully imported all collections and attributes!")
  } catch (error) {
    console.error("Failed to read or import JSON:", error.message)
  }
}

// change to your JSON file path
importSchemaFromJson("Schema_2025-02-13_07-10-08.json")
