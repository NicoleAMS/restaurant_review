import { displayRestaurant, addRestaurantMarker } from "./restaurants";
const allRestaurants = require("./restaurants.json");
const styles = require("./google_maps.json");
export let restaurantsOnMap = [];
export let googleMap;

export function initMap() {
  // map with default position
  var paris = { lat: 48.864716, lng: 2.349014 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: paris, 
    styles: styles
  });
  googleMap = map;

  // geolocation: center map based on user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      googleMap = map;
      var marker = new google.maps.Marker({ position: pos, map: map });
    });
  }

  // set lat/lng of NE & SW corners every time the map becomes idle after dragging, panning or zooming
  google.maps.event.addListener(map, "idle", function() {
    let viewportBounds = setViewportBounds(map);
    let restaurantsOnMap = setRestaurantsOnMap(viewportBounds);
    displayRestaurants(restaurantsOnMap, map);
  });

}

function setViewportBounds(map) {
  googleMap = map;
  var bounds = map.getBounds();
  var NE = bounds.getNorthEast();
  var SW = bounds.getSouthWest();
  var SWLatLng = new google.maps.LatLng(SW.lat(), SW.lng());
  var NELatLng = new google.maps.LatLng(NE.lat(), NE.lng());

  // set corner coordinates of the map
  var viewportBounds = new google.maps.LatLngBounds(SWLatLng, NELatLng);
  return viewportBounds;
}

function setRestaurantsOnMap(viewportBounds) {
  // check if restaurant is currently visible on the map
  restaurantsOnMap = [];
  allRestaurants.forEach(restaurant => {
    var restaurantLatLng = new google.maps.LatLng({lat: restaurant.lat, lng: restaurant.long});
    if (viewportBounds.contains(restaurantLatLng)) {
      restaurantsOnMap.push(restaurant);
    } 
  });
  return restaurantsOnMap;
}

function displayRestaurants(restaurantsOnMap, map) {
  // destroy existing restaurant-components
  const restaurantColumn = document.getElementById("restaurantCol");
  restaurantColumn.innerHTML = '';

  restaurantsOnMap.forEach(restaurant => {
    // display restaurants visible on the map
    displayRestaurant(restaurant, restaurantColumn);
    // adds markers on the  map for each visible restaurant
    addRestaurantMarker(restaurant, map);
  });
}