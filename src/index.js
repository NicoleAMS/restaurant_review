import "bootstrap";
import "./main.scss";
import { Restaurant } from "./restaurant.class";
import "./restaurant-card.component";
import "./min-max-select.component";
import "./restaurant-details.component";
import { initMap } from "./google_maps";
import { filterRestaurantList, restaurantsOnMap } from "./restaurants";
const jsonRestaurants = require("./restaurants.json");
export const allRestaurants = [];

document.addEventListener("DOMContentLoaded", function() {
  const google_api_key = process.env.GOOGLE_API_KEY;

  // add google script tag to DOM
  const googleScriptTag = document.createElement("script");
  googleScriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${google_api_key}&callback=initMap`;
  document.getElementsByTagName("body")[0].appendChild(googleScriptTag);

  // initialize google maps
  window.initMap = initMap;

  // create restaurant objects
  for (let i = 0; i < jsonRestaurants.length; i++) {
    const restaurant = new Restaurant({
      id: jsonRestaurants[i].id,
      name: jsonRestaurants[i].restaurantName,
      address: jsonRestaurants[i].address,
      lat: jsonRestaurants[i].lat,
      long: jsonRestaurants[i].long,
      ratings: jsonRestaurants[i].ratings
    });
    allRestaurants.push(restaurant);
  }
  console.log(allRestaurants);

  // get min-max-select
  const minMaxSelectMenu = document.querySelector("min-max-select");

  // listen to changes on the min-max-select component: minimum star rating
  minMaxSelectMenu.minStarSelect.addEventListener("change", e => {
    filterRestaurantList(
      restaurantsOnMap,
      minMaxSelectMenu.minStarAverage,
      minMaxSelectMenu.maxStarAverage
    );
  });

  // listen to changes on the min-max-select component: maximum star rating
  minMaxSelectMenu.maxStarSelect.addEventListener("change", e => {
    filterRestaurantList(
      restaurantsOnMap,
      minMaxSelectMenu.minStarAverage,
      minMaxSelectMenu.maxStarAverage
    );
  });
});
