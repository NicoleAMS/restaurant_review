import "bootstrap";
import "./main.scss";
import "./restaurant-card.component";
import "./min-max-select.component";
import { initMap, restaurantsOnMap, googleMap } from "./google_maps";
import { displayRestaurant, destroyRestaurants } from "./restaurants";

document.addEventListener("DOMContentLoaded", function() {
  const google_api_key = process.env.GOOGLE_API_KEY;

  // add google script tag to DOM
  const googleScriptTag = document.createElement("script");
  googleScriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${google_api_key}&callback=initMap`;
  document.getElementsByTagName("body")[0].appendChild(googleScriptTag);

  // initialize google maps
  window.initMap = initMap;

  // get min-max-select
  const minMaxSelectMenu = document.querySelector("min-max-select");

  // listen to changes on the min-max-select component: minimum star rating
  minMaxSelectMenu.minStarSelect.addEventListener("change", e => {
    // set minimum star rating
    minMaxSelectMenu.minStarAverage = e.target.value;
    // filter restaurants
    onFilterSelect(minMaxSelectMenu);
    // update the max select values
    minMaxSelectMenu.updateMaxSelect();
  });

  // listen to changes on the min-max-select component: maximum star rating
  minMaxSelectMenu.maxStarSelect.addEventListener("change", e => {
    minMaxSelectMenu.maxStarAverage = e.target.value;
    onFilterSelect(minMaxSelectMenu);
  });
});

function onFilterSelect(component) {
  const restaurantColumn = document.getElementById("restaurantCol");

  // destroy existing restaurant-components
  destroyRestaurants(restaurantsOnMap);

  // re-add filtered restaurants
  const filteredRestaurants = component.filterTool(restaurantsOnMap);
  filteredRestaurants.forEach(restaurant => {
    displayRestaurant(restaurant, restaurantColumn);
    restaurant.marker.setMap(googleMap);
  });
}
