import { displayRestaurant, addRestaurantMarker } from "./restaurants";
const allRestaurants = require("./restaurants.json");
const styles = require("./google_maps.json");
export let restaurants = [];
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
    onBoundsChanged();
  });

  function onBoundsChanged() {
    console.log('bounds changed');
    googleMap = map;
    var bounds = map.getBounds();
    var NE = bounds.getNorthEast();
    var SW = bounds.getSouthWest();
    var SWLatLng = new google.maps.LatLng(SW.lat(), SW.lng());
    var NELatLng = new google.maps.LatLng(NE.lat(), NE.lng());

    // set corner coordinates of the map
    var viewportBounds = new google.maps.LatLngBounds(SWLatLng, NELatLng);

    // check if restaurant is currently visible on the map
    restaurants = [];
    allRestaurants.forEach(restaurant => {
      var restaurantLatLng = new google.maps.LatLng({lat: restaurant.lat, lng: restaurant.long});
      if (viewportBounds.contains(restaurantLatLng)) {
        restaurants.push(restaurant);
      } 
    });

    const starTotal = 5;
    const restaurantColumn = document.getElementById("restaurantCol");

    // destroy existing restaurant-components
    restaurantColumn.innerHTML = '';

    restaurants.forEach(restaurant => {
      // display restaurants visible on the map
      displayRestaurant(restaurant, restaurantColumn, starTotal);
      // adds markers on the  map for each visible restaurant
      addRestaurantMarker(restaurant, map);
    });
  }
}

