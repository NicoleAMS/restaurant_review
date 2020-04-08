import Template from "../templates/new-restaurant-page.template";
import {initMap} from "../../google_maps/google_maps.js";
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

    document.addEventListener("latlng", () => {
      this.position = event.detail.position;
    });

    const form = document.getElementById("newRestaurantForm");
    form.addEventListener("submit", this._onFormSubmit.bind(this));
  }

  render(state, selector) {
    this.state = state;
    this.innerHTML = Template.render(state);
    this.parent = document.getElementById(selector);
    this.parent.appendChild(this);

    // const restaurantForm = document.createElement("restaurant-form");
    // restaurantForm.render(state, "formSlot");
  }

  _onFormSubmit() {
    event.preventDefault();

    if (!this.position) {
      const form = document.getElementById("newRestaurantForm");
      const helpText = document.createElement("div");
      helpText.style.marginTop = "15px";
      helpText.innerHTML = `
        <small class="row">
          <span class="col col-1 text-secondary pr-0">*</span> 
          <span class="col col-11 px-0">Please click on the map for the location of the new restaurant.</span>
        </small>`;
      form.appendChild(helpText);
    } else {
      // get restaurant details from user
      const name = document.getElementById("inputName").value;
      const address = document.getElementById("inputAddress").value;

      // create restaurant
      this.restaurant = this.createRestaurant(name, address);

      // dispatch custom event
      const restaurantCreatedEvent = new CustomEvent("restaurantCreated", {
        bubbles: true,
        detail: { restaurant: this.restaurant }
      });
      event.target.dispatchEvent(restaurantCreatedEvent);
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
}

if (!customElements.get("new-restaurant-page")) {
  customElements.define("new-restaurant-page", NewRestaurantPage);
}