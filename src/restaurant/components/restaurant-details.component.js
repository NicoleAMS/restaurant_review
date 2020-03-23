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

    const btn = this.querySelector("#backBtn");
    console.log(btn);
    btn.addEventListener("click", this._showRestaurantList.bind(this));
  }

  _showRestaurantList(event) {
    const showRestaurantListEvent = new CustomEvent("showRestaurantList", {
      bubbles: true
    });
    console.log(showRestaurantListEvent);
    event.target.dispatchEvent(showRestaurantListEvent);
  }

}

customElements.define("restaurant-details", RestaurantDetails);
