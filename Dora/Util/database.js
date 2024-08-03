import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

// Open the database asynchronously
async function openDatabase() {
  try {
    const db = await SQLite.openDatabaseAsync('places.db');
    return db;
  } catch (error) {
    console.error('Failed to open database:', error);
    throw error;
  }
}

// Initialize the database
export async function init() {
  const db = await openDatabase();

  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      );
    `);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

// Insert a place into the database
export async function insertPlace(place) {
  const db = await openDatabase();
  try {
    const result = await db.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      [place.title, place.imageUri, place.address, place.location.lat, place.location.lng]
    );
    console.log('Insert Result:', result);
    return result;
  } catch (error) {
    console.error('Insert Error:', error);
    throw error;
  }
}

// Fetch data from database
export async function fetchPlaces() {
  const db = await openDatabase();

  try {
    const result = await db.getAllAsync('SELECT * FROM places');
    const places = result.map(dp =>
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
    );
    return places;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

// Fetch single data from database
export async function fetchPlaceDetails(id) {
  const db = await openDatabase();

  try {
    const result = await db.getAllAsync('SELECT * FROM places WHERE id = ?', [id]);
    const dbPlace = result[0]
    const place = new Place(
      dbPlace.title,
      dbPlace.imageUri,
      {
        address: dbPlace.address,
        lat: dbPlace.lat,
        lng: dbPlace.lng,
      },
      dbPlace.id
    )
    //console.log('Place Detail:', result)
    return place;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}
