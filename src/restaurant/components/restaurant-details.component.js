import Template from "../templates/restaurant-details.template.js";

class RestaurantDetails extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
  }

  connectedCallback() {
    this.innerHTML = Template.render(this._restaurant);
  }

}

customElements.define("restaurant-details", RestaurantDetails);
