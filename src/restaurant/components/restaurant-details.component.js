import Template from "../templates/restaurant-details.template.js";
import { removeMarkers } from "../../google_maps/google_maps.js";

class RestaurantDetails extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
  }

  get restaurant() {
    return this._restaurant;
  }

  set dom(dom) {
    this._dom = dom;
  }

  get dom() {
    return this._dom;
  }

  connectedCallback() {
    this.innerHTML = Template.render(this.restaurant);
    this.dom = Template.mapDOM(this);

    if (window.google) {
      initMap();
    }

    document.addEventListener("markRestaurant", () => {
      const map = event.detail.map;
      // remove old markers from map
      removeMarkers(map);

      // add marker of current restaurant to map
      const marker = this.restaurant.marker;
      marker.setMap(map);
      map.markers.push(marker);
    });

    this.dom.button.addEventListener(
      "click",
      this.showRestaurantList.bind(this)
    );
  }

  showRestaurantList(event) {
    const showRestaurantListEvent = new CustomEvent("showRestaurantList", {
      bubbles: true
    });
    event.target.dispatchEvent(showRestaurantListEvent);
  }
}

customElements.define("restaurant-details", RestaurantDetails);
