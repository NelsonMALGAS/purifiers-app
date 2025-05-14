import { Db, MongoClient, ServerApiVersion } from "mongodb";

/**
 *  MongoDB Connection URI from .env file
 */
const uri = process.env.MONGODB_URI as string;

const dbName = "purity-pipe-project";
let dbInstance: Db | null = null;

if (!uri) {
  console.error("env MONDODB_URI not found , Please add it to .env file");
  process.exit(1);
}

const client = new MongoClient(uri, {
  maxIdleTimeMS: 500,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/**
 * Connect to MongoDB using the provided URI
 */

const connectToDb = async () => {
  if (dbInstance) {
    console.log("Already connected to MongoDB");
    return dbInstance;
  }

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    dbInstance = client.db(dbName);
    return dbInstance;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
};

export default connectToDb;
