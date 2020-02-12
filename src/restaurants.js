import { googleMap } from "./google_maps";

export function calculateAverageRating(ratings) {
  let average = 0;
  ratings.forEach(rating => {
    average += rating.stars;
  });
  average = average / ratings.length;
  return average;
}

export function createRestaurantCard(restaurant, restaurantColumn) {
  // calculate average star rating
  restaurant.average = calculateAverageRating(restaurant.ratings);
  // create restaurant component & append to DOM
  const element = document.createElement("restaurant-card");
  element.restaurant = restaurant;
  restaurantColumn.appendChild(element);
  // show star reviews
  document.querySelector(`.id_${restaurant.id} .stars-inner`).style.width =
    element.starPercentageRounded;
}

export function displayRestaurantList(restaurantsOnMap, map) {
  // destroy existing restaurant-cards
  const restaurantColumn = document.getElementById("restaurantCol");
  restaurantColumn.innerHTML = "";

  restaurantsOnMap.forEach(restaurant => {
    // display restaurants visible on the map
    createRestaurantCard(restaurant, restaurantColumn);
    // adds markers on the  map for each visible restaurant
    addRestaurantMarker(restaurant, map);
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
    const average = Math.round(restaurant.average);
    return average >= min && average <= max;
  });

  // re-add filtered restaurants
  filteredRestaurants.forEach(restaurant => {
    createRestaurantCard(restaurant, restaurantColumn);
    restaurant.marker.setMap(googleMap);
  });
}

export function addRestaurantMarker(restaurant, map) {
  var marker = new google.maps.Marker({
    position: { lat: restaurant.lat, lng: restaurant.long },
    map: map,
    icon:
      "https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-1-small.png,assets/icons/poi/tactile/pinlet_outline_v2-1-small.png,assets/icons/poi/tactile/pinlet-1-small.png,assets/icons/poi/quantum/pinlet/restaurant_pinlet-1-small.png&highlight=ff000000,ffffff,F1D11F,ffffff?scale=1.75"
  });

  var infoWindow = new google.maps.InfoWindow({
    content: `<p>${restaurant.restaurantName}</p>`
  });

  marker.addListener("click", function() {
    infoWindow.open(map, marker);
  });

  restaurant.marker = marker;
}
