import "bootstrap";
import "./main.scss";

import State from "./lib/state.js";
const jsonRestaurants = require("././restaurant/restaurants.json");

import "./pages/components/homepage.component";
import "./pages/components/new-restaurant-page.component";
import "./pages/components/detailspage.component";
import "./restaurant/components/restaurant-list.component";
import "./restaurant/components/restaurant-card.component";
import "./filter/min-max-select.component";
import "./review/components/review-form.component";
import "./review/components/review-card.component";
import "./review/components/review-list.component";

import { initMap, removeMarkers, makeDetailsRequest } from "./google_maps/google_maps";
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
  const jsonRestaurantArray = createRestaurants(jsonRestaurants);
  let allRestaurants = jsonRestaurantArray;
  let restaurantsOnMap = allRestaurants;
  let filteredRestaurants = allRestaurants;
  let currentRestaurant;

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

  function convertReviews(reviews) {
    let convertedReviews = [];
    for (let i = 0; i < reviews.length; i++) {
      let review = {
        id: `restaurant_${currentRestaurant.id}_rating_${convertedReviews.length}`,
        restaurantID: currentRestaurant.id,
        name: reviews[i].author_name,
        stars: parseFloat(reviews[i].rating),
        comment: reviews[i].text,
        picture: reviews[i].profile_photo_url,
        time: reviews[i].time
      };
      convertedReviews.push(review);
    }
    console.log("converted reviews: ", convertedReviews);
    return convertedReviews;
  }

  // populate state with initial restaurants
  restaurantState.update({
    allRestaurants,
    restaurantsOnMap,
    filteredRestaurants,
    currentRestaurant
  });

  // render restaurantList
  const state = restaurantState.getState();
  const homePage = document.createElement("home-page");
  homePage.render(state, "main");

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

    console.log(restaurantState);
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
    console.log("IN: show details listener");
    const state = restaurantState.getState();
    // let restaurant = state.allRestaurants.find(restaurant => {
    //   return event.detail.restaurant.id === restaurant.id;
    // });
    currentRestaurant = event.detail.restaurant;
    console.log('IN: current restaurant: ', currentRestaurant);
    // state.currentRestaurant = event.detail.restaurant;
    restaurantState.update({
      ...state, 
      currentRestaurant
    });

    // render detailsPage
    const detailsPage = document.createElement("details-page");
    detailsPage.render(state, "main");
  });

  document.addEventListener("reviewCreated", () => {
    const state = restaurantState.getState();
    // let restaurant = state.allRestaurants.find(restaurant => {
    //   return event.detail.restaurant.id === restaurant.id;
    // });
    let restaurant = event.detail.restaurant;
    // recalculate restaurant's average star rating
    restaurant.averageRating = restaurant.calculateAverageRating(
      restaurant.ratings
    );

    // recalculate restaurant's number of ratings
    restaurant.numberOfRatings = restaurant.ratings.length;

    // here, Google Places restaurants have created review in their ratings array, which is kept in currentRestaurant 
    console.log("review created for: ", restaurant);
  
    currentRestaurant = restaurant;

    restaurantState.update({
      ...state, 
      currentRestaurant
    });
  });

  document.addEventListener("rating-event", () => {
    console.log("rating event listener: ", event.detail.reviews);
    const convertedReviews = convertReviews(event.detail.reviews);
    const state = restaurantState.getState();
    currentRestaurant = state.currentRestaurant;
    console.log("current restaurant in rating event: ", currentRestaurant);
    currentRestaurant.ratings = convertedReviews;
    //  for (let i = 0; i < convertedReviews.length; i++) {
    //   //  currentRestaurant.ratings.push(convertedReviews[i]);
    //    const found = currentRestaurant.ratings.find(rating => {
    //      return rating.time === convertedReviews[i].time
    //    });
    //    if (found === undefined) {
    //      currentRestaurant.ratings.push(convertedReviews[i]);
    //    }
    //  }

     // update allRestaurants
    const index = state.allRestaurants.findIndex(restaurant => {
      if (restaurant.id === currentRestaurant.id) {
        return restaurant;
      }
    });
    state.allRestaurants[index] = currentRestaurant;
    allRestaurants = state.allRestaurants;

    restaurantState.update({
      ...state,
      currentRestaurant,
      allRestaurants
    });
    console.log("restaurant state in rating event: ", restaurantState);
  });

  document.addEventListener("restaurantCreated", () => {
    console.log(event.detail.restaurant);
    const state = restaurantState.getState();
    const restaurant = event.detail.restaurant;
    allRestaurants.push(restaurant);

    restaurantState.update({
      ...state,
      allRestaurants
    });

    showRestaurantList(state);
  });

  document.addEventListener("showRestaurantList", () => {
    const state = restaurantState.getState();
    // currentRestaurant is up to date, but allRestaurants, restaurantsOnMap, filteredRestaurants are not --> ratings is empty
    console.log("show list listener, state: ", state);
    showRestaurantList(state);
  });

  document.addEventListener("addRestaurant", () => {
    const state = restaurantState.getState();
    const main = document.querySelector("#main");
    main.innerHTML = "";
    const newRestaurantPage = document.createElement("new-restaurant-page");
    newRestaurantPage.render(state, "main");
  });
  
  document.addEventListener("markRestaurant", () => {
    console.log("IN: mark restaurant listener");
    const state = restaurantState.getState();
    const map = event.detail.map;
    // remove old markers from map
    removeMarkers(map);

    // add marker of current restaurant to map
    const marker = state.currentRestaurant.marker;
    marker.setMap(map);
    map.markers.push(marker);

    console.log("place: ", state.currentRestaurant);

    // commenting this out does not make custom reviews stay
    if (state.currentRestaurant.placeId) {
      const detailsRequest = {
        placeId: state.currentRestaurant.placeId,
        fields: ['review']
      }

      makeDetailsRequest(map, detailsRequest);
    }
  });

  function showRestaurantList(state) {
    console.log("show restaurant list");
    const main = document.querySelector("#main");
    main.innerHTML = "";
    const homepage = document.createElement("home-page");
    homepage.render(state, "main");
  }
});
