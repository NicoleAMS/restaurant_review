import Template from "../templates/restaurant-details.template.js";
import { addMarkerWithInfoWindow } from "../../google_maps/google_maps.js";

class RestaurantDetails extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
  }

  connectedCallback() {
    this.innerHTML = Template.render(this._restaurant);
    if (window.google) {
      initMap();
    }

    document.addEventListener("markRestaurant", () => {
      // console.log(this._restaurant);
      console.log(event.detail.map);
      const marker = this._restaurant.marker;
      console.log('marker1: ', marker.map);
      marker.map = event.detail.map;
      console.log('marker2: ', marker.map);
    });

    const btn = this.querySelector("#backBtn");
    btn.addEventListener("click", this._showRestaurantList.bind(this));
  }

  _showRestaurantList(event) {
    const showRestaurantListEvent = new CustomEvent("showRestaurantList", {
      bubbles: true
    });
    event.target.dispatchEvent(showRestaurantListEvent);
  }

}

customElements.define("restaurant-details", RestaurantDetails);
