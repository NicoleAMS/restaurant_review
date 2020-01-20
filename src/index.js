import "./main.scss";
import { initMap } from "./google_maps";
import "./restaurant-component";
import { calculateAverageRating } from "./restaurants";
const restaurants = require("./restaurants.json");

const restaurantColumn = document.getElementById("restaurantCol");

restaurants.forEach(restaurant => {
  restaurant.average = calculateAverageRating(restaurant.ratings);
  console.log(restaurant);
  const element = document.createElement("restaurant-component");
  element.restaurant = restaurant;
  restaurantColumn.appendChild(element);
});

window.initMap = initMap;
