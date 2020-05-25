import "bootstrap";
import "./main.scss";

import "./pages/components/homepage.component";
import "./pages/components/new-restaurant-page.component";
import "./pages/components/detailspage.component";
import "./restaurant/components/restaurant-list.component";
import "./restaurant/components/restaurant-card.component";
import "./filter/min-max-select.component";
import "./review/components/review-form.component";
import "./review/components/review-card.component";
import "./review/components/review-list.component";
import "./utils/event-listeners";
import RestaurantState from "./state/restaurant-state";
import { initMap } from "./google_maps/google_maps";
const jsonRestaurants = require("./restaurant/restaurants.json");

// instantiate state
export const restaurantState = new RestaurantState(jsonRestaurants);

document.addEventListener("DOMContentLoaded", function() {
  // get google api key
  const google_api_key = process.env.GOOGLE_API_KEY;

  // add google script tag to DOM
  const googleScriptTag = document.createElement("script");
  googleScriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${google_api_key}&callback=initMap&libraries=places`;
  document.getElementsByTagName("body")[0].appendChild(googleScriptTag);

  // initialize google maps
  window.initMap = initMap;

  // render homepage
  const state = restaurantState.getState();
  const homePage = document.createElement("home-page");
  homePage.render(state, "main");
});
