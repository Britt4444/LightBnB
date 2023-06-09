// access environment variables
const dotenv = require("dotenv");
dotenv.config();

// create connection pool
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {
  const queryString = `
  SELECT * FROM users 
  WHERE email = $1;
  `;
  const params = [email.toLowerCase()];
  return pool
    .query(queryString, params)
    .then((result) => {
      if (result.rows) {
        return result.rows[0];
      }
      return null;
    })
    .catch((err) => console.log(err.message));
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
  SELECT * FROM users 
  WHERE id = $1;
  `;
  const params = [id];
  return pool
    .query(queryString, params)
    .then((result) => {
      if (result.rows) {
        return result.rows[0];
      }
      return null;
    })
    .catch((err) => console.log(err.message));
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const queryString = `
  INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3) 
  RETURNING *;`;
  const params = [user.name, user.email, user.password];
  return pool
    .query(queryString, params)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => console.log(err.message));
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) { // this is not working still!!
  const queryString = `
  SELECT reservations.*, title, thumbnail_photo_url, number_of_bathrooms, number_of_bedrooms,
  parking_spaces, cost_per_night, AVG(property_reviews.rating) as average_rating
    FROM reservations
   JOIN users ON reservations.guest_id = users.id
   JOIN property_reviews ON users.id = property_reviews.guest_id
   JOIN properties ON properties.id = property_reviews.property_id
   WHERE reservations.guest_id = $1
   GROUP BY reservations.id, properties.id
   ORDER BY start_date DESC
   LIMIT $2;
  `;
  const params = [guest_id, limit];
  return pool
    .query(queryString, params)
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  let queryParams = [];

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    const operator = queryParams.length > 0 ? 'AND' : 'WHERE';
    queryParams.push(options.owner_id);
    queryString += `${operator} owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    const operator = queryParams.length > 0 ? 'AND' : 'WHERE';
    queryParams.push(options.minimum_price_per_night * 100);
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `${operator} cost_per_night BETWEEN $${queryParams.length - 1} AND $${queryParams.length} `;
  }

  if (options.minimum_rating) {
    const operator = queryParams.length > 0 ? 'AND' : 'WHERE';
    queryParams.push(options.minimum_rating);
    queryString += `${operator} rating >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool
    .query(queryString, queryParams)
    .then((result) => {
      if (!result.rows) return null;
      return result.rows;
    })
    .catch((err) => console.log(err.message));
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryString = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province,
  post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
  RETURNING *;`;
  const queryParams = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url,
    property.cost_per_night * 100, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces,
    property.number_of_bathrooms, property.number_of_bedrooms];

  return pool
    .query(queryString, queryParams)
    .then((result) => {
      if (!result.rows) return null;
      return result.rows;
    })
    .catch((err) => console.log(err.message));
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
