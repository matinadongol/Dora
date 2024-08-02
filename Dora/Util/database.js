import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

// Open the database asynchronously
async function openDatabase() {
  try {
    const db = SQLite.openDatabaseSync("places.db");
    return db;
  } catch (error) {
    console.error("Failed to open database:", error);
    throw error;
  }
}

// Initialize the database
export async function init() {
  const database = await openDatabase()

  return new Promise((resolve, reject) => {
    database.isInTransactionSync((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        (_, result) => {
          console.log(result)
          resolve(result)
        },
        (_, error) => reject(error)
      );
    });
  });
}

// Insert a place into the database
export async function insertPlace(place) {
  const database = await openDatabase()

  return new Promise((resolve, reject) => {
    database.isInTransactionSync((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log('Insert Result: ',result)
          resolve(result)
        },
        (_, error) => {
          console.error('Insert Error:', error)
          reject(error)}
      );
    });
  });
}

// fetch data from database
export async function fetchPlaces() {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    database.isInTransactionSync((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];
          for (const dp of result.row._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id
              )
            )
          }
          resolve(places)
        },
        (_, error) => reject(error)
      );
    });
  });
}
