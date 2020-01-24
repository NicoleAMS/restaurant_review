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
  };

  // adds markers for each restaurant
  restaurants.forEach(restaurant => {
    const restaurantMarker = {
      coords:  {lat: restaurant.lat, lng: restaurant.long},
      icon: {
        url: "https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-1-small.png,assets/icons/poi/tactile/pinlet_outline_v2-1-small.png,assets/icons/poi/tactile/pinlet-1-small.png,assets/icons/poi/quantum/pinlet/restaurant_pinlet-1-small.png&highlight=ff000000,ffffff,F1D11F,ffffff?scale=1.75"
      },
      content: `<h3>${restaurant.restaurantName}</h3>`
    };
    addMarker(restaurantMarker);
  });
}

