import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define MONGODB_URI in your environment variables.");
}

const client = new MongoClient(uri);
const clientPromise = globalThis._mongoClientPromise ?? client.connect();

if (process.env.NODE_ENV !== "production") {
  globalThis._mongoClientPromise = clientPromise;
}

export default clientPromise;
