
const properties = require("./json/properties.json");
const users = require("./json/users.json");


const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email) {
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
const getUserWithId = function (id) {
  const queryString = `
  SELECT * FROM users 
  WHERE id = $1;
  `;
  const params = [id];
  return pool
    .query(queryString, params)
    .then((result) => {
      if (result.rows) {
        console.log(result.rows);
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
const addUser = function(user) { // this is not working still!!
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
const getAllReservations = function (guest_id, limit = 10) { // this is not working still!!
  const queryString = `
  SELECT reservations.*, title, thumbnail_photo_url, number_of_bathrooms, number_of_bedrooms,
  parking_spaces, cost_per_night, AVG(property_reviews.rating) as average_rating
    FROM reservations
   JOIN users ON reservations.guest_id = users.id
   JOIN property_reviews ON users.id = property_reviews.guest_id
   JOIN properties ON properties.id = property_reviews.property_id
   WHERE reservations.guest_id = $1
   GROUP BY reservations.id, properties.id
   ORDER BY start_date
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
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
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
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
