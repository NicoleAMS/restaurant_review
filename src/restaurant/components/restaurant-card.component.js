import Template from "../templates/restaurant-card.template.js";

class RestaurantCard extends HTMLElement {
  constructor() {
    super();
    this.starTotal = 5;
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
  }

  get restaurant() {
    return this._restaurant;
  }

  set starTotal(total) {
    this._starTotal = total;
  }

  get starTotal() {
    return this._starTotal;
  }

  set starPercentage(percentage) {
    this._starPercentage = percentage;
  }

  get starPercentage() {
    return this._starPercentage;
  }

  set starPercentageRounded(rounded) {
    this._starPercentageRounded = rounded;
  }

  get starPercentageRounded() {
    return this._starPercentageRounded;
  }

  connectedCallback() {
    this.starPercentage =
      (this.restaurant.averageRating / this.starTotal) * 100;
    this.starPercentageRounded = this.roundStarPercentage(this.starPercentage);

    this.innerHTML = Template.render(
      this.restaurant,
      this.starPercentageRounded
    );
    this.addEventListener("click", this.showDetails.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.showDetails);
  }

  showDetails(event) {
    const showDetailsEvent = new CustomEvent("showDetails", {
      bubbles: true,
      detail: { restaurant: this.restaurant }
    });
    event.target.dispatchEvent(showDetailsEvent);
  }

  roundStarPercentage(percentage) {
    return `${Math.round(percentage / 10) * 10}%`;
  }
}

customElements.define("restaurant-card", RestaurantCard);
