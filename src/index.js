import "./main.scss";
import "./restaurant-component";
import { initMap } from "./google_maps";
import { calculateAverageRating } from "./restaurants";
const restaurants = require("./restaurants.json");

window.initMap = initMap;

const restaurantColumn = document.getElementById("restaurantCol");

document.addEventListener("DOMContentLoaded", function() {
  const starTotal = 5;
  restaurants.forEach(restaurant => {
    // calculate average star rating
    restaurant.average = calculateAverageRating(restaurant.ratings);

    // create restaurant component & append to DOM
    const element = document.createElement("restaurant-component");
    element.restaurant = restaurant;
    restaurantColumn.appendChild(element);

    // show star reviews
    const starPercentage = (restaurant.average / starTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    document.querySelector(
      `.id_${restaurant.id} .stars-inner`
    ).style.width = starPercentageRounded;
  });
});

