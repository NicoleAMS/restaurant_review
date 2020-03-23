// import { Restaurant } from "../restaurant.class.js";
import Template from "../templates/restaurant-list.template";

class RestaurantList extends HTMLElement {
  constructor() {
    super();
  }

  // set allRestaurants(restaurants) {
  //   this._allRestaurants = restaurants;
  // }

  // set filteredRestaurants(restaurants) {
  //   this._filteredRestaurants = restaurants;
  // }

  connectedCallback() {
    this.innerHTML = Template.render();
    if (window.google) {
      initMap();
    }
    console.log(window);

    const btn = this.querySelector("#addRestaurant");
    btn.addEventListener("click", () => {
      console.log("add restaurant");
    });
  }

  // createRestaurant(restaurant) {
  //   const restaurant = new Restaurant({
  //     id: restaurant.id,
  //     name: restaurant.restaurantName,
  //     address: restaurant.address,
  //     lat: restaurant.lat,
  //     long: restaurant.long,
  //     ratings: restaurant.ratings
  //   });
  //   this._allRestaurants.push(restaurant);
  // }

  // displayList() {
  // }

  // appendrestaurantToList() {}


  // filterRestaurants() {}

}

customElements.define("restaurant-list", RestaurantList);