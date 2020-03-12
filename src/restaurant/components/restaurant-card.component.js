import Template from "../templates/restaurant-card.template.js";

class RestaurantCard extends HTMLElement {
  constructor() {
    super();
    this._starTotal = 5;
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
  }

  connectedCallback() {
    this._starPercentage = (this._restaurant.averageRating / this._starTotal) * 100;
    this._starPercentageRounded = `${Math.round(this._starPercentage / 10) *
      10}%`;

    this.innerHTML = Template.render(this._restaurant, this._starPercentageRounded);
    this.addEventListener("click", this._showDetails.bind(this));
  }

  _showDetails(event) {
    const showDetailsEvent = new CustomEvent("showDetails", {
      bubbles: true,
      detail: { restaurant: this._restaurant }
    });
    event.target.dispatchEvent(showDetailsEvent);
  }
}

customElements.define("restaurant-card", RestaurantCard);
