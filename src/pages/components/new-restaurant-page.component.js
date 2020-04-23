import Template from "../templates/new-restaurant-page.template";
import { initMap } from "../../google_maps/google_maps.js";
import RestaurantsModule from "../../restaurant/restaurants.module";

class NewRestaurantPage extends HTMLElement {
  constructor() {
    super();
    this.position;
  }

  connectedCallback() {
    if (window.google) {
      initMap();
    }
    this.dom = Template.mapDOM(this);

    document.addEventListener("latlng", () => {
      this.position = event.detail.position;
    });

    this.dom.form.addEventListener("submit", this._onFormSubmit.bind(this));
  }

  render(state, selector) {
    this.state = state;
    this.innerHTML = Template.render(state);
    this.parent = document.getElementById(selector);
    this.parent.appendChild(this);

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

  _onFormSubmit() {
    event.preventDefault();

    if (!this.position) {
      const helpText = Template.createHelpText();
      this.dom.form.appendChild(helpText);
    } else {
      // create restaurant with input values
      this.restaurant = this.createRestaurant(
        this.dom.name.value,
        this.dom.address.value
      );
      // dispatch custom event
      this.dispatchCreatedEvent();
    }
  }

  createRestaurant(name, address) {
    const restaurant = RestaurantsModule.createRestaurant({
      id: this.state.allRestaurants.length + 1,
      restaurantName: name,
      address: address,
      lat: this.position.lat,
      long: this.position.lng,
      ratings: []
    });
    return restaurant;
  }

  dispatchCreatedEvent() {
    const restaurantCreatedEvent = new CustomEvent("restaurantCreated", {
      bubbles: true,
      detail: { restaurant: this.restaurant }
    });
    event.target.dispatchEvent(restaurantCreatedEvent);
  }
}

if (!customElements.get("new-restaurant-page")) {
  customElements.define("new-restaurant-page", NewRestaurantPage);
}
