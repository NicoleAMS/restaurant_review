import Template from "../templates/restaurant-details.template.js";

class RestaurantDetails extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant) {
    this.innerHTML = Template.render(restaurant);
  }

}

customElements.define("restaurant-details", RestaurantDetails);
