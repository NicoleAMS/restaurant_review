import "bootstrap";
import "./main.scss";
import "./restaurant-component";
import "./rating-filter-component";
import { initMap, restaurants, googleMap } from "./google_maps";
import { displayRestaurant } from "./restaurants";

window.initMap = initMap;

document.addEventListener("DOMContentLoaded", function() {
  const google_api_key = process.env.GOOGLE_API_KEY;

  // add google script tag to DOM
  const googleScriptTag = document.createElement("script");
  googleScriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${google_api_key}&callback=initMap`;
  document.getElementsByTagName("body")[0].appendChild(googleScriptTag);

  // create filter-component
  const filterDiv = document.getElementById("filterDiv");
  const element = document.createElement("filter-component");
  element.filter = "";
  filterDiv.appendChild(element);

  const minStarSelect = document.getElementById("minStarSelect");
  const maxStarSelect = document.getElementById("maxStarSelect");
  let minStarAverage = 0;
  let maxStarAverage = 5;

  minStarSelect.addEventListener("change", e => {
    minStarAverage = e.target.value;
    filterRestaurants(restaurants, minStarAverage, maxStarAverage);
  });

  maxStarSelect.addEventListener("change", e => {
    maxStarAverage = e.target.value;
    filterRestaurants(restaurants, minStarAverage, maxStarAverage);
  });
});

function filterRestaurants(restaurants, min, max) {
  // destroy existing restaurant-components
  const restaurantColumn = document.getElementById("restaurantCol");
  restaurantColumn.innerHTML = "";

  const starTotal = 5;
  restaurants.forEach(restaurant => {
    restaurant.marker.setMap(null);
    const average = Math.round(restaurant.average);
    if (average >= min && average <= max) {
      displayRestaurant(restaurant, restaurantColumn, starTotal);
      restaurant.marker.setMap(googleMap);
    }
  });
}
