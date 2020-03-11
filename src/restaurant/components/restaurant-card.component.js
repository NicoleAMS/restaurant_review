import Template from "../templates/restaurant-card.template.js";

class RestaurantCard extends HTMLElement {
  constructor() {
    super();
    this.starTotal = 5;
  }

  connectedCallback() {
    this.addEventListener("click", this._showDetails.bind(this));
  }

  set restaurant(restaurant) {
    this.restaurantDetails = restaurant;
    this.starPercentage = (restaurant.averageRating / this.starTotal) * 100;
    this.starPercentageRounded = `${Math.round(this.starPercentage / 10) *
      10}%`;

    this.innerHTML = Template.render(restaurant, this.starPercentageRounded);
  }

  _showDetails(event) {
    const showDetailsEvent = new CustomEvent("showDetails", {
      bubbles: true,
      detail: { restaurant: this.restaurantDetails }
    });
    event.target.dispatchEvent(showDetailsEvent);
  }
}

customElements.define("restaurant-card", RestaurantCard);
