import RestaurantsModule from "../restaurant/restaurants.module";
import { initMap, removeMarkers, makeDetailsRequest } from "../google_maps/google_maps";
import State from "../lib/state.js";
const jsonRestaurants = require("../restaurant/restaurants.json");

export const restaurantState = new State();

document.addEventListener("DOMContentLoaded", function() {
  const google_api_key = process.env.GOOGLE_API_KEY;

  // add google script tag to DOM
  const googleScriptTag = document.createElement("script");
  googleScriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${google_api_key}&callback=initMap&libraries=places`;
  document.getElementsByTagName("body")[0].appendChild(googleScriptTag);

  // initialize google maps
  window.initMap = initMap;

  // instantiate state properties
  const jsonRestaurantArray = RestaurantsModule.createRestaurants(jsonRestaurants);
  let allRestaurants = jsonRestaurantArray;
  let restaurantsOnMap = allRestaurants;
  let filteredRestaurants = allRestaurants;
  let currentRestaurant;
  let formReviews = [];

  // populate state with properties
  restaurantState.update({
    allRestaurants,
    restaurantsOnMap,
    filteredRestaurants,
    currentRestaurant,
    formReviews
  });

  // render restaurantList
  const state = restaurantState.getState();
  const homePage = document.createElement("home-page");
  homePage.render(state, "main");

  // // EVENT LISTENERS
  document.addEventListener("mapIdle", () => {
    // gets event details
    const bounds = event.detail.bounds;
    const map = event.detail.map;
    const restaurants = map.results;
  
    // gets app's state
    const state = restaurantState.getState();

    // update GP restaurant's average rating and number of reviews with formReviews
    restaurants.forEach((restaurant) => {
      const currentFormReviews = RestaurantsModule.getCurrentFormReviews(state, restaurant);
      if (currentFormReviews.length > 0) {
        restaurant.rating = RestaurantsModule.updateAverageRating(restaurant, currentFormReviews);
        restaurant.user_ratings_total = restaurant.user_ratings_total + currentFormReviews.length;
      }
    });
  
    // converts GP restaurants to app's format 
    const convertedNearbyRestaurants = RestaurantsModule.convertNearbyRestaurants(restaurants);
    const nearbyRestaurantObjects = RestaurantsModule.createRestaurants(convertedNearbyRestaurants);
  
    // updates properties of app's state
    state.allRestaurants = [];
    state.allRestaurants = [...jsonRestaurantArray, ...nearbyRestaurantObjects];
    restaurantsOnMap = RestaurantsModule.setRestaurantsOnMap(
      bounds,
      state.allRestaurants
    );
    filteredRestaurants = restaurantsOnMap;
  
    // displays restaurant markers
    RestaurantsModule.displayRestaurantMarkers(restaurantsOnMap, map);
  
    // calls update on state to inform observers of changes
    restaurantState.update({
      ...state,
      restaurantsOnMap,
      filteredRestaurants,
      map
    });
  });

  document.addEventListener("onMinChange", () => {
    // gets app's state
    const state = restaurantState.getState();
  
    // updates properties of app's state
    filteredRestaurants = RestaurantsModule.filterRestaurantList(
      state.restaurantsOnMap,
      event.detail.min,
      event.detail.max
    );
  
    // remove old markers and replace with markers of filtered restaurants
    removeMarkers(state.map);
    RestaurantsModule.displayRestaurantMarkers(filteredRestaurants, state.map);
  
    // calls update on state to inform observers of changes
    restaurantState.update({
      ...state,
      filteredRestaurants
    });
  });

  document.addEventListener("onMaxChange", () => {
    // gets app's state
    const state = restaurantState.getState();
  
    // updates properties of app's state
    filteredRestaurants = RestaurantsModule.filterRestaurantList(
      state.restaurantsOnMap,
      event.detail.min,
      event.detail.max
    );
  
    // remove old markers and replace with markers of filtered restaurants
    removeMarkers(state.map);
    RestaurantsModule.displayRestaurantMarkers(filteredRestaurants, state.map);
  
    // calls update on state to inform observers of changes
    restaurantState.update({
      ...state,
      filteredRestaurants
    });
  });

  document.addEventListener("showDetails", () => {
    // gets app's state
    const state = restaurantState.getState();
  
    // updates properties of app's state
    currentRestaurant = event.detail.restaurant;
  
    // calls update on state to inform observers of changes
    restaurantState.update({
      ...state, 
      currentRestaurant
    });
  
    // creates and renders detailsPage with updated state
    const detailsPage = document.createElement("details-page");
    detailsPage.render(state, "main");
  });

  document.addEventListener("reviewCreated", () => {
    // gets app's state
    const state = restaurantState.getState();
  
    // get event details
    let restaurant = event.detail.restaurant;
    let review = event.detail.review;
  
    // recalculate restaurant's average star rating
    restaurant.averageRating = restaurant.calculateAverageRating(
      restaurant.ratings
    );
  
    // recalculate restaurant's number of ratings
    restaurant.numberOfRatings = restaurant.ratings.length;
  
    // updates properties of app's state
    currentRestaurant = restaurant;
    formReviews.push(review);
  
    // calls update on state to inform observers of changes
    restaurantState.update({
      ...state, 
      currentRestaurant, 
      formReviews
    });
  });

  document.addEventListener("rating-event", () => {
    // gets app's state
    const state = restaurantState.getState();
  
    // get event details
    const reviews = event.detail.reviews;
  
    // converts GP reviews to app's format 
    const convertedReviews = RestaurantsModule.convertReviews(reviews, state.currentRestaurant);
  
    // updates currentRestaurant property of app's state
    const currentFormReviews = [];
    currentRestaurant = state.currentRestaurant;
    state.formReviews.forEach((review) => {
      if (review.restaurantID === currentRestaurant.id) {
        currentFormReviews.push(review);
      }
    });
    currentRestaurant.ratings = [...currentFormReviews, ...convertedReviews];
  
     // updates allRestaurants property of app's state
    const index = state.allRestaurants.findIndex(restaurant => {
      if (restaurant.id === currentRestaurant.id) {
        return restaurant;
      }
    });
    state.allRestaurants[index] = currentRestaurant;
    allRestaurants = state.allRestaurants;
  
    // calls update on state to inform observers of changes
    restaurantState.update({
      ...state,
      currentRestaurant,
      allRestaurants
    });
  });

  document.addEventListener("restaurantCreated", () => {
    // gets app's state
    const state = restaurantState.getState();
  
    // gets event details 
    const restaurant = event.detail.restaurant;
  
    // updates properties of app's state
    allRestaurants.push(restaurant);
  
    // calls update on state to inform observers of changes
    restaurantState.update({
      ...state,
      allRestaurants
    });
  
    // navigates back to homepage
    RestaurantsModule.showRestaurantList(state);
  });

  document.addEventListener("showRestaurantList", () => {
    // gets app's state
    const state = restaurantState.getState();
  
    // navigates back to homepage
    RestaurantsModule.showRestaurantList(state);
  });

  document.addEventListener("addRestaurant", () => {
    // gets app's state
    const state = restaurantState.getState();
  
    // empties main element
    const main = document.querySelector("#main");
    main.innerHTML = "";
  
    // renders new-restaurant page 
    const newRestaurantPage = document.createElement("new-restaurant-page");
    newRestaurantPage.render(state, "main");
  });
  
  document.addEventListener("markRestaurant", () => {
    // gets app's state
    const state = restaurantState.getState();
  
    // gets event details
    const map = event.detail.map;
  
    // remove old markers from map
    removeMarkers(map);
  
    // add marker of current restaurant to map
    const marker = state.currentRestaurant.marker;
    marker.setMap(map);
    map.markers.push(marker);
  
    // makes GP details request if GP restaurant
    if (state.currentRestaurant.placeId) {
      const detailsRequest = {
        placeId: state.currentRestaurant.placeId,
        fields: ['review']
      }
      makeDetailsRequest(map, detailsRequest);
    }
  });
});