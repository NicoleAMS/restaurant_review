import State from "../lib/state.js";
import restaurantsModule from "../restaurant/restaurants.module.js";

class RestaurantState extends State {
  constructor(jsonRestaurants) {
    super();
    this.state = {};

    // convert jsonRestaurants to restaurant objects
    this.state.jsonRestaurants = this.convertJSONRestaurants(jsonRestaurants);

    this.init();
  }

  init() {
    // initializes the restaurant-state's properties
    this.state.allRestaurants = this.state.jsonRestaurants;
    this.state.restaurantsOnMap = this.state.allRestaurants;
    this.state.filteredRestaurants = this.state.allRestaurants;
    this.state.currentRestaurant;
    this.state.formReviews = [];
  }

  convertJSONRestaurants(jsonRestaurants) {
    const restaurantArray = restaurantsModule.createRestaurants(
      jsonRestaurants
    );
    return restaurantArray;
  }
}

export default RestaurantState;
