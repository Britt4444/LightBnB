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
3. Start the web server using the `node server` command. The app will be served at <http://localhost:3000/>.
4. Go to <http://localhost:3000/> in your browser.

## Dependencies

- node 5.10.x or above
- bcrypt
- cookie-session
- express
- pg

## Technology

- This project was heavily focused on front-end development and design through the use of HTML, CSS, Sass, JS, jQuery, and AJAX.
- On the backend, the server framework was developed using Node and Express. 
It's all about that database. You'll build the back-end queries that allow users to search for accommodations in an online travel app. You'll connect to a PostgreSQL database using Node's postgres library and write the queries that deliver the right data to the front end.

## Page Features

- Select red double-arrow "Write a new tweet" button to toggle the new-tweet form.
- Type tweet in the textarea once toggled, ensuring to not submit an empty tweet or tweet over 140 characters.
- Click "Tweet" button to submit tweet.
- When scrolling, click circular, up-arrow button to return to the top of the page.

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
└── server.js
```

* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.
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
