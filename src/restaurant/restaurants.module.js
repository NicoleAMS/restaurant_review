import { addMarkerWithInfoWindow } from "../google_maps/google_maps";
import { Restaurant } from "./restaurant.class";

export default {
  createRestaurant(rest) {
    const restaurant = new Restaurant({
      id: rest.id,
      placeId: rest.placeId,
      name: rest.restaurantName,
      address: rest.address,
      lat: rest.lat,
      long: rest.long,
      ratings: rest.ratings,
      numberOfRatings: rest.user_ratings_total || rest.ratings.length,
      averageRating: rest.averageRating 
    });
    return restaurant;
  },

  createRestaurants(array) {
    let restaurants = [];
    for (let i = 0; i < array.length; i++) {
      const restaurant = this.createRestaurant(array[i]);
      restaurants.push(restaurant);
    }
    return restaurants;
  },

  convertNearbyRestaurants(restaurants) {
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
  },

  setRestaurantsOnMap(viewportBounds, restaurants) {
    this.restaurantsOnMap = [];
    restaurants.forEach(restaurant => {
      var restaurantLatLng = new google.maps.LatLng({
        lat: restaurant.lat,
        lng: restaurant.long
      });
      if (viewportBounds.contains(restaurantLatLng)) {
        this.restaurantsOnMap.push(restaurant);
      }
    });
    return this.restaurantsOnMap;
  },

  displayRestaurantMarkers(restaurants, map) {
    restaurants.forEach(restaurant => {
      const restaurantMarker = restaurant.createRestaurantMarker(map);
      const marker = addMarkerWithInfoWindow(restaurantMarker);
      restaurant.marker = marker;
      map.markers.push(marker);
    });
  },

  showRestaurantList(state) {
    const main = document.querySelector("#main");
    main.innerHTML = "";
    const homepage = document.createElement("home-page");
    homepage.render(state, "main");
  },

  filterRestaurantList(restaurants, min, max) {
    const filteredRestaurants = restaurants.filter(restaurant => {
      const average = restaurant.averageRating;
      return average >= min && average <= max;
    });
    return filteredRestaurants;
  },

  showRestaurantCard(restaurant, restaurantColumn) {
    restaurantColumn.appendChild(restaurant.restaurantCard);
  },

  convertReviews(reviews, currentRestaurant) {
    const convertedReviews = [];
    for (let i = 0; i < reviews.length; i++) {
      const review = {
        id: `restaurant_${currentRestaurant.id}_rating_${i}`,
        restaurantID: currentRestaurant.id,
        name: reviews[i].author_name,
        stars: parseFloat(reviews[i].rating),
        comment: reviews[i].text,
        picture: reviews[i].profile_photo_url,
        timestamp: (reviews[i].time * 1000)
      };
      convertedReviews.push(review);
    }
    return convertedReviews;
  }, 

  getCurrentFormReviews(state, currentRestaurant) {
    const currentFormReviews = [];
    state.formReviews.forEach((review) => {
      if (review.restaurantID === currentRestaurant.id) {
        currentFormReviews.push(review);
      }
    });
    return currentFormReviews;
  }, 

  updateAverageRating(restaurant, formReviews) {
    const gpRating = restaurant.rating;
    const gpTotalReviews = restaurant.user_ratings_total;
    const formAverage = this.getFormRatingAverage(formReviews);
    const formTotalReviews = formReviews.length;
    const totalReviews = gpTotalReviews + formTotalReviews;

    const totalScore = (gpRating * gpTotalReviews) + (formAverage * formTotalReviews);
    const average = totalScore / totalReviews;
    return average;
  } ,

  getFormRatingAverage(formReviews) {
    let totalScore = 0;
    formReviews.forEach((review) => {
      totalScore += review.stars;
    });
    return totalScore / formReviews.length;
  }
};
