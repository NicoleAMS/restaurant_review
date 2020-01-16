import "./main.scss";
import {initMap} from "./google_maps";
import "./restaurant-component";

const restaurants = require("./restaurants.json");

const restaurantColumn = document.getElementById('restaurantCol');

restaurants.forEach(restaurant => {
    const element = document.createElement('restaurant-component');
    element.restaurant = restaurant;
    restaurantColumn.appendChild(element);
});

window.initMap = initMap;
