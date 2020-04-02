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
      const map = event.detail.map;
      // remove old markers from map
      for (let i = 0; i < map.markers.length; i++) {
        map.markers[i].setMap(null);
      }
      map.markers = [];
      
      // add marker of current restaurant to map
      const marker = this._restaurant.marker;
      marker.setMap(map);
      map.markers.push(marker);
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
