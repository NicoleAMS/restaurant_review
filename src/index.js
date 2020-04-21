import "bootstrap";
import "./main.scss";

import State from "./lib/state.js";
const jsonRestaurants = require("././restaurant/restaurants.json");

import "./pages/components/homepage.component";
import "./pages/components/new-restaurant-page.component";
import "./restaurant/components/restaurant-list.component";
import "./restaurant/components/restaurant-card.component";
import "./filter/min-max-select.component";
import "./review/components/review-form.component";
import "./restaurant/components/restaurant-details.component";
import "./review/components/review-card.component";

import { initMap, removeMarkers } from "./google_maps/google_maps";
import RestaurantsModule from "./restaurant/restaurants.module.js";

export const restaurantState = new State();

document.addEventListener("DOMContentLoaded", function() {
  const google_api_key = process.env.GOOGLE_API_KEY;

  // add google script tag to DOM
  const googleScriptTag = document.createElement("script");
  googleScriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${google_api_key}&callback=initMap&libraries=places`;
  document.getElementsByTagName("body")[0].appendChild(googleScriptTag);

  // initialize google maps
  window.initMap = initMap;

  // instantiate classes
  const homePage = document.createElement("home-page");

  const jsonRestaurantArray = createRestaurants(jsonRestaurants);
  let allRestaurants = jsonRestaurantArray;
  let restaurantsOnMap = allRestaurants;
  let filteredRestaurants = allRestaurants;

  function createRestaurants(array) {
    let restaurants = [];
    for (let i = 0; i < array.length; i++) {
      const restaurant = RestaurantsModule.createRestaurant(array[i]);
      restaurants.push(restaurant);
    }
    return restaurants;
  }

  function convertNearbyRestaurants(restaurants) {
    let nearbyRestaurants = [];
    for (let i = 0; i < restaurants.length; i++) {
      let restaurant = {
        id: restaurants[i].id,
        placeId: restaurants[i].place_id,
        restaurantName: restaurants[i].name,
        address: restaurants[i].vicinity,
        lat: restaurants[i].geometry.location.lat(),
        long: restaurants[i].geometry.location.lng(),
        ratings: [],
        user_ratings_total: restaurants[i].user_ratings_total,
        averageRating: restaurants[i].rating
      };
      nearbyRestaurants.push(restaurant);
    }
    return nearbyRestaurants;
  }

  // populate state with initial restaurants
  restaurantState.update({
    allRestaurants,
    restaurantsOnMap,
    filteredRestaurants
  });

  // render restaurantList
  const state = restaurantState.getState();
  homePage.render(restaurantState, state, "main");

  // EVENT LISTENERS
  document.addEventListener("mapIdle", () => {
    const bounds = event.detail.bounds;
    const map = event.detail.map;

    console.log(map.results);

    const convertedNearbyRestaurants = convertNearbyRestaurants(map.results);
    const nearbyRestaurantObjects = createRestaurants(convertedNearbyRestaurants);

    const state = restaurantState.getState();
    state.allRestaurants = [];
    state.allRestaurants = [...jsonRestaurantArray, ...nearbyRestaurantObjects];

    restaurantsOnMap = RestaurantsModule.setRestaurantsOnMap(
      bounds,
      state.allRestaurants
    );
    filteredRestaurants = restaurantsOnMap;
    RestaurantsModule.displayRestaurantMarkers(restaurantsOnMap, map);
    restaurantState.update({
      ...state,
      restaurantsOnMap,
      filteredRestaurants,
      map
    });
  });

  document.addEventListener("onMinChange", () => {
    const state = restaurantState.getState();
    filteredRestaurants = RestaurantsModule.filterRestaurantList(
      state.restaurantsOnMap,
      event.detail.min,
      event.detail.max
    );

    // remove old markers and replace with markers of filtered restaurants
    removeMarkers(state.map);
    RestaurantsModule.displayRestaurantMarkers(filteredRestaurants, state.map);

    restaurantState.update({
      ...state,
      filteredRestaurants
    });
  });

  document.addEventListener("onMaxChange", () => {
    const state = restaurantState.getState();
    filteredRestaurants = RestaurantsModule.filterRestaurantList(
      state.restaurantsOnMap,
      event.detail.min,
      event.detail.max
    );

    // remove old markers and replace with markers of filtered restaurants
    removeMarkers(state.map);
    RestaurantsModule.displayRestaurantMarkers(filteredRestaurants, state.map);

    restaurantState.update({
      ...state,
      filteredRestaurants
    });
  });

  document.addEventListener("showDetails", () => {
    const state = restaurantState.getState();
    let restaurant = state.allRestaurants.find(restaurant => {
      return event.detail.restaurant.id === restaurant.id;
    });
    state.currentRestaurant = restaurant;
    RestaurantsModule.showRestaurantDetails(restaurant, state);
  });

  document.addEventListener("reviewCreated", () => {
    const state = restaurantState.getState();
    let restaurant = state.allRestaurants.find(restaurant => {
      return event.detail.restaurant.id === restaurant.id;
    });
    // recalculate restaurant's average star rating
    restaurant.averageRating = restaurant.calculateAverageRating(
      restaurant.ratings
    );
  });

  document.addEventListener("restaurantCreated", () => {
    const state = restaurantState.getState();
    const restaurant = event.detail.restaurant;
    state.allRestaurants.push(restaurant);

    restaurantState.update({
      ...state,
      allRestaurants
    });

    showRestaurantList(state);
  });

  document.addEventListener("showRestaurantList", () => {
    const state = restaurantState.getState();
    showRestaurantList(state);
  });

  document.addEventListener("addRestaurant", () => {
    const state = restaurantState.getState();
    const main = document.querySelector("#main");
    main.innerHTML = "";
    const newRestaurantPage = document.createElement("new-restaurant-page");
    newRestaurantPage.render(state, "main");
  });

  function showRestaurantList(state) {
    const main = document.querySelector("#main");
    main.innerHTML = "";
    const homepage = document.createElement("home-page");
    homepage.render(restaurantState, state, "main");
  }
});
