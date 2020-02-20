import { googleMap, addMarkerWithInfoWindow } from "./google_maps";
import { allRestaurants } from ".";
export let restaurantsOnMap = [];

export function setRestaurantsOnMap(viewportBounds) {
  restaurantsOnMap = [];
  allRestaurants.forEach(restaurant => {
    var restaurantLatLng = new google.maps.LatLng({
      lat: restaurant.lat,
      lng: restaurant.long
    });
    if (viewportBounds.contains(restaurantLatLng)) {
      restaurantsOnMap.push(restaurant);
    }
  });
  return restaurantsOnMap;
}

export function displayRestaurantList(restaurantsOnMap, map) {
  // destroy existing restaurant-cards
  const restaurantColumn = document.getElementById("restaurantCol");
  restaurantColumn.innerHTML = "";

  restaurantsOnMap.forEach(restaurant => {
    // display restaurants visible on the map
    showRestaurantCard(restaurant, restaurantColumn);
    // adds markers on the  map for each visible restaurant
    const restaurantMarker = restaurant.createRestaurantMarker(map);
    const marker = addMarkerWithInfoWindow(restaurantMarker);
    restaurant.marker = marker;
  });
}

export function destroyRestaurantList(restaurants) {
  const restaurantColumn = document.getElementById("restaurantCol");
  restaurantColumn.innerHTML = "";
  restaurants.forEach(restaurant => {
    restaurant.marker.setMap(null);
  });
}

export function filterRestaurantList(restaurants, min, max) {
  const restaurantColumn = document.getElementById("restaurantCol");

  // destroy existing restaurant-components
  destroyRestaurantList(restaurants);

  // get filtered restaurants
  const filteredRestaurants = restaurants.filter(restaurant => {
    const average = Math.round(restaurant.averageRating);
    return average >= min && average <= max;
  });

  // re-add filtered restaurants
  filteredRestaurants.forEach(restaurant => {
    showRestaurantCard(restaurant, restaurantColumn);
    restaurant.marker.setMap(googleMap);
  });
}

export function showRestaurantCard(restaurant, restaurantColumn) {
  restaurantColumn.appendChild(restaurant.restaurantCard);
  // show star reviews
  document.querySelector(`.id_${restaurant.id} .stars-inner`).style.width =
    restaurant.restaurantCard.starPercentageRounded;
}

export function showRestaurantDetails(restaurant) {
  const restaurantColumn = document.getElementById("restaurantCol");

  const detailsEl = document.createElement("restaurant-details");
  detailsEl.restaurant = restaurant;
  restaurantColumn.appendChild(detailsEl);

  //add google street view
  // const streetViewCol = document.querySelector(`restaurant-details #modal_${restaurant.id} .modal-body #streetView`);
  const streetViewImg = document.querySelector(`restaurant-details #modal_${restaurant.id} .modal-body #streetViewImg`);
  const google_api_key = process.env.GOOGLE_API_KEY;
  const streetViewSrc = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${restaurant.lat},${restaurant.long}
  &key=${google_api_key}`;
  streetViewImg.src = streetViewSrc;

  // clear modal's body text
  const detailsBody = document.querySelector(`restaurant-details #modal_${restaurant.id} .modal-body #reviews`);
  detailsBody.innerHTML = "";

  // adds reviews to modal
  for (let i = 0; i < restaurant.ratings.length; i++) {
    addReviewCard(restaurant, i);
  }
}

function addReviewCard(restaurant, index) {
  const detailsBody = document.querySelector(`restaurant-details #modal_${restaurant.id} .modal-body #reviews`);
  const ratingEl = document.createElement("review-card");
  ratingEl.review = restaurant.ratings[index];
  detailsBody.appendChild(ratingEl);

  document.querySelector(`#${restaurant.ratings[index].id} .stars-inner`).style.width =
  ratingEl.starPercentageRounded;
}
