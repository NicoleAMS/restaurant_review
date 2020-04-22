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

  filterRestaurantList(restaurants, min, max) {
    const filteredRestaurants = restaurants.filter(restaurant => {
      const average = restaurant.averageRating;
      return average >= min && average <= max;
    });
    return filteredRestaurants;
  },

  showRestaurantCard(restaurant, restaurantColumn) {
    restaurantColumn.appendChild(restaurant.restaurantCard);
  }
};
