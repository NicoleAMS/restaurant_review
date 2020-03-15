import { googleMap, addMarkerWithInfoWindow } from "../google_maps/google_maps";
import { allRestaurants } from "..";

export default {

  setRestaurantsOnMap(viewportBounds) {
    this.restaurantsOnMap = [];
    allRestaurants.forEach(restaurant => {
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
  
  displayRestaurantList(restaurantsOnMap, map) {
    // destroy existing restaurant-cards
    const restaurantColumn = document.getElementById("restaurantCol");
    restaurantColumn.innerHTML = "";
  
    restaurantsOnMap.forEach(restaurant => {
      // display restaurants visible on the map
      this.showRestaurantCard(restaurant, restaurantColumn);
      // adds markers on the  map for each visible restaurant
      const restaurantMarker = restaurant.createRestaurantMarker(map);
      const marker = addMarkerWithInfoWindow(restaurantMarker);
      restaurant.marker = marker;
    });
  },
  
  destroyRestaurantList(restaurants) {
    const restaurantColumn = document.getElementById("restaurantCol");
    restaurantColumn.innerHTML = "";
    restaurants.forEach(restaurant => {
      restaurant.marker.setMap(null);
    });
  },
  
  filterRestaurantList(restaurants, min, max) {
    const restaurantColumn = document.getElementById("restaurantCol");
  
    // destroy existing restaurant-components
    this.destroyRestaurantList(restaurants);
  
    // get filtered restaurants
    const filteredRestaurants = restaurants.filter(restaurant => {
      const average = Math.round(restaurant.averageRating);
      return average >= min && average <= max;
    });
  
    // re-add filtered restaurants
    filteredRestaurants.forEach(restaurant => {
      this.showRestaurantCard(restaurant, restaurantColumn);
      restaurant.marker.setMap(googleMap);
    });
  },
  
  showRestaurantCard(restaurant, restaurantColumn) {
    restaurantColumn.appendChild(restaurant.restaurantCard);
  },
  
  showRestaurantDetails(restaurant) {
    const restaurantColumn = document.getElementById("restaurantCol");
    restaurantColumn.innerHTML = "";
    restaurantColumn.appendChild(restaurant.restaurantDetails);
  
    //add google street view
    this.addStreetView(restaurant);
  
    // clear card's body text
    const detailsBody = document.querySelector(
      `restaurant-details #card_${restaurant.id} .card-body #reviews`
    );
    detailsBody.innerHTML = "";
  
    // adds reviews to card
    for (let i = 0; i < restaurant.ratings.length; i++) {
      this.addReviewCard(restaurant, i);
    }
  },
  
  addReviewCard(restaurant, index) {
    // console.log(restaurant);
    const detailsBody = document.querySelector(
      `restaurant-details #card_${restaurant.id} .card-body #reviews`
    );
    const ratingEl = document.createElement("review-card");
    ratingEl.review = restaurant.ratings[index];
    detailsBody.appendChild(ratingEl);
  
    document.querySelector(
      `#${restaurant.ratings[index].id} .stars-inner`
    ).style.width = ratingEl.starPercentageRounded;
  },
  
  addStreetView(restaurant) {
    const streetViewImg = document.querySelector(
      `restaurant-details #card_${restaurant.id} .card-body #streetViewImg`
    );
    const google_api_key = process.env.GOOGLE_API_KEY;
    const streetViewSrc = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${restaurant.lat},${restaurant.long}
    &key=${google_api_key}`;
    streetViewImg.src = streetViewSrc;
    return streetViewImg;
  }
}