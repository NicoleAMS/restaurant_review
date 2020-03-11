import "bootstrap";
import "./main.scss";
import { Restaurant } from "./restaurant/restaurant.class";
import "./restaurant/components/restaurant-card.component";
import "./filter/min-max-select.component";
import "./review/components/review-form.component";
import "./restaurant/components/restaurant-details.component";
import "./review/components/review-card.component";
import { initMap } from "./google_maps/google_maps";
import {
  filterRestaurantList,
  restaurantsOnMap
} from "./restaurant/restaurants";
import { showRestaurantDetails } from "./restaurant/restaurants.js";
const jsonRestaurants = require("././restaurant/restaurants.json");
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

  // get min-max-select
  const minMaxSelectMenu = document.querySelector("min-max-select");

  // listen to changes on the min-max-select component: minimum star rating
  minMaxSelectMenu.dom.minStarSelect.addEventListener("change", e => {
    filterRestaurantList(
      restaurantsOnMap,
      minMaxSelectMenu.minimum,
      minMaxSelectMenu.maximum
    );
  });

  // listen to changes on the min-max-select component: maximum star rating
  minMaxSelectMenu.dom.maxStarSelect.addEventListener("change", e => {
    filterRestaurantList(
      restaurantsOnMap,
      minMaxSelectMenu.minimum,
      minMaxSelectMenu.maximum
    );
  });

  document.addEventListener("showDetails", () => {
    showRestaurantDetails(event.detail.restaurant);
  });
});
