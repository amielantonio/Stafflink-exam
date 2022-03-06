# Stafflink Developer Test
Hi, this is my developer test. I'll list down below all the technologies I've used and also how to install them.

## Technologies Used
- Webpack - for compiling scss, javascript, and vue js files.
- VueJS - frontend framework used
- axios - Promised based HTTP client used to get movie details.
- Git
- SCSS/SASS
- Understrap Theme (child)

## Installation

Install NPM packages and composer packages
````
npm install && composer install
````

Compile webpack to load the exam files
````
npm run w-dev
````

#### On Wordpress backend

Create a `Search Results` page with a `search-results` slug to make the `page-search-results.php` to work.

## Notes

I wasn't able to use the understrap scss, the npm script shows an error during compilation and I had limited time to check the error so I opted myself to use webpack to compile the scss instead.

I used Vuejs for the frontend, I think it's much easier to do changes in the frontend.

## Folders
Here are the folders where I placed my codes

Javascript files:
- ./src/js/components/
- ./src/js/app.js
- ./helpers.js
- ./webpack.config.js
 
SCSS files
- ./src/sass/theme/components
- ./src/sass/theme/app.scss

PHP files
- ./front-page.php
- ./page-search-results.php