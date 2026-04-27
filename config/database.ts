import { Db, MongoClient } from "mongodb";

let client: MongoClient;
let db: Db;

export async function connectToDatabse() {
  if (db) {
    return db;
  }
  client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  db = client.db("bookings");
  return db;
}
