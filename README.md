# Restaurant Review SPA 

OpenClassrooms Front-End Developer path project: 'Launch your own restaurant review site'.

## Introduction
This repo contains the code for a SPA that lists restaurants near you and lets you see restaurant details including reviews. A user can also add restaurants and reviews. 

It was developed based on a brief that can be found in the documents folder above.

## Technologies and overall design
The main technologies and tools I used for this are:
* HTML 5 / SCSS
* Bootstrap 4
* Vanilla JavaScript (ES6)
* Web Components
* NPM
* Webpack 4
* Google Maps API
* Google Places API
* Google Street View Static API
* Font Awesome 

I used an object-oriented approach with web components, the observer pattern to manage state, a google-maps.js file that handles all external interaction with the Google Maps and Google Places APIs, and customEvents and listeners to sit in between user interaction and google maps events on the one hand and the state on the other. There is also a JSON file with an additional list of (fake) restaurants.

## Setup
To run this project:
* clone to your local machine
* get a Google API key and restrict its use to the Maps API, the Places API and the Street View API 
* create a .env file in the root folder and add your API key as follows: `GOOGLE_API_KEY = <YOUR-KEY>`
* make sure you have Node and NPM installed by running `node --version` (I used v10.4.1) and `npm --version` (I used 6.13.4)
* run `npm install` to install NPM packages
* run `npm start` to start a local dev server
