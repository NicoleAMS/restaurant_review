import { displayRestaurantList, setRestaurantsOnMap } from "../restaurant/restaurants";
const styles = require("./google_maps.json");
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
    displayRestaurantList(restaurantsOnMap, map);
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

export function addMarkerWithInfoWindow(props) {
  var marker = new google.maps.Marker({
    position: props.coords,
    map: props.map,
    icon: props.icon
  });
  var infoWindow = new google.maps.InfoWindow({
    content: props.content
  });

  marker.addListener("click", function() {
    infoWindow.open(props.map, marker);
  });
  return marker;
}