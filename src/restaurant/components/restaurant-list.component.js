import Template from "../templates/restaurant-list.template";

class RestaurantList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.active = true;
    this.addRestaurantListener();
  }

  disconnectedCallback() {
    this.active = false;
  }

  render(state, selector) {
    this.innerHTML = Template.render(state);
    this.parent = document.getElementById(selector);
    this.parent.appendChild(this);

    for (let i = 0; i < state.filteredRestaurants.length; i++) {
      this.addRestaurantCard(state.filteredRestaurants[i].restaurantCard);
    }
  }

  update(state) {
    if (this.active) {
      this.render(state, "homepageSlot");
    }
  }

  addRestaurantCard(restaurant) {
    this.parent = document.getElementById("restaurantCol");
    this.parent.appendChild(restaurant);
  }

  addRestaurantListener() {
    const btn = document.querySelector("#addRestaurant");
    btn.addEventListener("click", this.onAddRestaurant);
  }

  onAddRestaurant() {
    console.log("add restaurant");
  }

  // removeRestaurantListener() {
  //   const btn = document.querySelector("#addRestaurant");
  //   btn.removeEventListener("click", this.onAddRestaurant);
  // }

}

if (!customElements.get("restaurant-list")) {
  customElements.define("restaurant-list", RestaurantList);
}


  // addRestaurantMarker(){
  //   // adds markers on the  map for each visible restaurant
  //   const restaurantMarker = restaurant.createRestaurantMarker(map);
  //   const marker = addMarkerWithInfoWindow(restaurantMarker);
  //   restaurant.marker = marker;
  // }

  // setRestaurantsOnMap(viewportBounds, restaurants) {
  //   const restaurantsOnMap = [];
  //   restaurants.forEach(restaurant => {
  //     var restaurantLatLng = new google.maps.LatLng({
  //       lat: restaurant.lat,
  //       lng: restaurant.long
  //     });
  //     if (viewportBounds.contains(restaurantLatLng)) {
  //       restaurantsOnMap.push(restaurant);
  //     }
  //   });
  //   return restaurantsOnMap;
  // }