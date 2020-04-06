import "bootstrap";
import "./main.scss";

import State from "./lib/state.js";
const jsonRestaurants = require("././restaurant/restaurants.json");

import "./pages/components/homepage.component";
import "./restaurant/components/restaurant-list.component";
import "./restaurant/components/restaurant-card.component";
import "./filter/min-max-select.component";
import "./review/components/review-form.component";
import "./restaurant/components/restaurant-details.component";
import "./review/components/review-card.component";

import { initMap, removeMarkers } from "./google_maps/google_maps";
import RestaurantsModule from "./restaurant/restaurants.module.js";

document.addEventListener("DOMContentLoaded", function() {
  const google_api_key = process.env.GOOGLE_API_KEY;

  // add google script tag to DOM
  const googleScriptTag = document.createElement("script");
  googleScriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${google_api_key}&callback=initMap`;
  document.getElementsByTagName("body")[0].appendChild(googleScriptTag);

  // initialize google maps
  window.initMap = initMap;

  // instantiate classes
  const restaurantState = new State();
  const homePage = document.createElement("home-page");

  const allRestaurants = getRestaurants();
  let restaurantsOnMap = allRestaurants;
  let filteredRestaurants = allRestaurants;

  // create restaurant objects
  function getRestaurants() {
    let restaurants = [];
    for (let i = 0; i < jsonRestaurants.length; i++) {
      const restaurant = RestaurantsModule.createRestaurant(jsonRestaurants[i]);
      restaurants.push(restaurant);
    }
    return restaurants;
  }

  // populate state with initial restaurants
  restaurantState.update({allRestaurants, restaurantsOnMap, filteredRestaurants});

  // add observers 

  // render restaurantList
  const state = restaurantState.getState();
  homePage.render(restaurantState, state, "main");
  // restaurantList.render(state, "main-site");

  // EVENT LISTENERS
  document.addEventListener("mapIdle", () => {
    const bounds = event.detail.bounds;
    const map = event.detail.map;
    const state = restaurantState.getState();

    restaurantsOnMap = RestaurantsModule.setRestaurantsOnMap(bounds, state.allRestaurants);
    filteredRestaurants = restaurantsOnMap;
    RestaurantsModule.displayRestaurantMarkers(restaurantsOnMap, map);
    restaurantState.update({
      ...state, restaurantsOnMap, filteredRestaurants, map
    });
  });

  document.addEventListener("onMinChange", () => {
    const state = restaurantState.getState();
    filteredRestaurants = RestaurantsModule.filterRestaurantList(
      state.restaurantsOnMap, event.detail.min, event.detail.max
    );

    // remove old markers and replace with markers of filtered restaurants
    removeMarkers(state.map);
    RestaurantsModule.displayRestaurantMarkers(filteredRestaurants, state.map);

    restaurantState.update({
      ...state, filteredRestaurants
    });
  });

  document.addEventListener("onMaxChange", () => {
    const state = restaurantState.getState();
    filteredRestaurants = RestaurantsModule.filterRestaurantList(
      state.restaurantsOnMap, event.detail.min, event.detail.max
    );

    // remove old markers and replace with markers of filtered restaurants
    removeMarkers(state.map);
    RestaurantsModule.displayRestaurantMarkers(filteredRestaurants, state.map);

    restaurantState.update({
      ...state, filteredRestaurants
    });
  });

  document.addEventListener("showDetails", () => {
    const state = restaurantState.getState();
    const restaurant = state.allRestaurants.find(restaurant => {
      return event.detail.restaurant.id === restaurant.id;
    });
    RestaurantsModule.showRestaurantDetails(restaurant, state);
  });

  document.addEventListener("reviewCreated", () => {
    const state = restaurantState.getState();
    let restaurant = state.allRestaurants.find(restaurant => {
      return event.detail.restaurant.id === restaurant.id;
    });
    // recalculate restaurant's average star rating
    restaurant.averageRating = restaurant.calculateAverageRating(restaurant.ratings);
  });

  document.addEventListener("showRestaurantList", () => {
    const main = document.querySelector("#main");
    main.innerHTML = "";
    const homepage = document.createElement("home-page");
    homepage.render(restaurantState, state, "main");
  });

});
