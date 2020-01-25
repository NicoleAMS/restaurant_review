const restaurants = require("./restaurants.json");
const styles = require("./google_maps.json");

export function initMap() {
  // map with default position
  var paris = { lat: 48.864716, lng: 2.349014 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: paris, 
    styles: styles
  });
  var marker = new google.maps.Marker({ position: paris, map: map });

  // geolocation: center map based on user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      marker = new google.maps.Marker({ position: pos, map: map });
    });
  }

  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      icon: props.icon
    });

    var infoWindow = new google.maps.InfoWindow({
      content: props.content
    });

    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  };

  // adds markers for each restaurant
  restaurants.forEach(restaurant => {
    const restaurantMarker = {
      coords:  {lat: restaurant.lat, lng: restaurant.long},
      icon: {
        url: "https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-1-small.png,assets/icons/poi/tactile/pinlet_outline_v2-1-small.png,assets/icons/poi/tactile/pinlet-1-small.png,assets/icons/poi/quantum/pinlet/restaurant_pinlet-1-small.png&highlight=ff000000,ffffff,F1D11F,ffffff?scale=1.75"
      },
      content: `<p>${restaurant.restaurantName}</p>`
    };
    addMarker(restaurantMarker);
  });

  // set lat/lng of NE & SW corners every time the map changes
  google.maps.event.addListener(map, "bounds_changed", function() {
    var bounds = map.getBounds();
    var NE = bounds.getNorthEast();
    var SW = bounds.getSouthWest();
    var SWLatLng = new google.maps.LatLng(SW.lat(), SW.lng());
    var NELatLng = new google.maps.LatLng(NE.lat(), NE.lng());

    // set corner coordinates of the map
    var viewportBounds = new google.maps.LatLngBounds(SWLatLng, NELatLng);

    // check if restaurant is currently visible on the map
    restaurants.forEach(restaurant => {
      var restaurantLatLng = new google.maps.LatLng({lat: restaurant.lat, lng: restaurant.long});
      console.log(restaurantLatLng.lat(), restaurantLatLng.lng());
      if (viewportBounds.contains(restaurantLatLng)) {
        console.log("visible");
      } else {
        console.log("hidden");
      }
    });
  });
}

