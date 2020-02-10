import "bootstrap";
import "./main.scss";
import "./restaurant-component";
import "./rating-filter-component";
import { initMap, restaurants, googleMap } from "./google_maps";
import { displayRestaurant, destroyRestaurants } from "./restaurants";

window.initMap = initMap;

document.addEventListener("DOMContentLoaded", function() {
  const google_api_key = process.env.GOOGLE_API_KEY;

  // add google script tag to DOM
  const googleScriptTag = document.createElement("script");
  googleScriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${google_api_key}&callback=initMap`;
  document.getElementsByTagName("body")[0].appendChild(googleScriptTag);

  // get filter-component
  const filterComponent = document.querySelector("filter-component");

  // listen to changes on the filter component: minimum star rating
  filterComponent.minStarSelect.addEventListener("change", e => {
    // set minimum star rating
    filterComponent.minStarAverage = e.target.value;
    // filter restaurants
    onFilterSelect(filterComponent);
    // update the max select values
    filterComponent.updateMaxSelect();
  });

  // listen to changes on the filter component: maximum star rating
  filterComponent.maxStarSelect.addEventListener("change", e => {
    filterComponent.maxStarAverage = e.target.value;
    onFilterSelect(filterComponent);
  });
});

function onFilterSelect(component) {
  const starTotal = 5;
  const restaurantColumn = document.getElementById("restaurantCol");
  
  // destroy existing restaurant-components
  destroyRestaurants(restaurants);

  // re-add filtered restaurants 
  const filteredRestaurants = component.filterTool(restaurants);
  filteredRestaurants.forEach(restaurant => {
    displayRestaurant(restaurant, restaurantColumn, starTotal);
    restaurant.marker.setMap(googleMap);
  });
}