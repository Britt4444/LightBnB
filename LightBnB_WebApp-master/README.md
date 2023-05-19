# LightBnB &rarr; 🏰❔⛺❔🏩❔🏡❔🌃

A multi-page Airbnb clone that uses server-side JavaScript to render data from SQL queries in a web-based format. 

The simple design allows users to:
- create a login
- view and store information about rental properties and reservations
- search properties by city, cost per night, and/or minimum rating.

## Getting Started 👇

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
4. Create an .env file in the project folder to store relevant environment variables, in the format:
    - PGUSER='user'
    - PGHOST='host_name'
    - PGPASSWORD='password'
    - PGDATABASE='database_name' 
    - PGPORT='port_number'
5. To seed LightBnB with dummy data to interact with, connect to the database via node-postgres (pg) and run the following within the relevant directory:
    - `\i ../migrations/01_schema.sql` to create all database tables
    - `\i ../seeds/01_seeds.sql` to add data to the tables
    - `\i ../seeds/02_seeds.sql` to add even more data to the tables
6. Start the web server using the `node server` command. The app will be served at <http://localhost:3000/>.
7. Go to <http://localhost:3000/> in your browser.
8. Log in as any user from the seed files using the user email along with the password 'password'.
9. You are also able to create your own user log in to explore the LightBnB features.

## Dependencies

- node 5.10.x or above
- bcrypt
- cookie-session
- express
- pg
- dotenv

## Technology
 
This project focused on implementing complex SQL queries with node-postgres along with database and ERD (entity relationship diagram) design to integrate the database with a Node backend.

## Page Features

- Select "Sign Up" to create a new user profile; log in/log out with this email and password
- Alternately, select "Log In" and enter a seed file email and 'password' to view dummy data
- Click "Search" to search for rental properties
- Click "Create Listing" to enter a new rental property into the database
- Click "My Listings" to view relevant user listings

## LightBnB Database Entity Relationship Diagram

*ERD*
![LightBnB ERD]()

## Final Product

*Home*
![Home page - not logged in](https://github.com/Britt4444/LightBnB/blob/master/LightBnB_WebApp-master/public/docs/homepage.png?raw=true)

*Sign Up new user*
![Sign up new user form](https://github.com/Britt4444/LightBnB/blob/master/LightBnB_WebApp-master/public/docs/createnewlogin.png?raw=true)

*My Listings*
![User property listings](https://github.com/Britt4444/LightBnB/blob/master/LightBnB_WebApp-master/public/docs/mylistingsloggedin.png?raw=true)

*My Reservations*
![User reservations - starting with most recent](https://github.com/Britt4444/LightBnB/blob/master/LightBnB_WebApp-master/public/docs/myreservations.png?raw=true)

*Search*
![Search properties form](https://github.com/Britt4444/LightBnB/blob/master/LightBnB_WebApp-master/public/docs/searchproperties.png?raw=true)


## Project Structure

```
.
├── db
│   ├── json
│   └── database.js
├── public
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── libraries
│   │   ├── index.js
│   │   ├── network.js
│   │   └── views_manager.js
│   ├── styles
│   │   ├── main.css
│   │   └── main.css.map
│   └── index.html
├── routes
│   ├── apiRoutes.js
│   └── userRoutes.js
├── styles  
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _property-listings.scss
│   └── main.scss
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
|── server.js
├── migrations  
│   ├── 01_schema.sql
├── seeds
│   ├── 01_seeds.sql
|   ├── 02_seeds.sql
```

* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database.
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
* `styles` contains all of the sass files. 
* `server.js` is the entry point to the application. This connects the routes to the database.
* `migrations` contains the schema file for the database.
  * `01_schema.sql` contains the SQL schema of all tables in the database.
* `seeds` contains the data seed files for the SQL database.
  * `01_seeds.sql` contains seed data.
  * `02_seeds.sql` contains seed data.
