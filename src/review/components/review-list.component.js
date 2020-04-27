import Template from "../templates/review-list.template";
import { restaurantState } from "../../index.js";

class ReviewList extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
  }

  get restaurant() {
    return this._restaurant;
  }

  set componentConnected(componentConnected) {
    this._componentConnected = componentConnected;
  }

  get componentConnected() {
    return this._componentConnected;
  }

  connectedCallback() {
    this.componentConnected = true;
    restaurantState.addObserver(this);
    console.log("state observers after adding reviewList: ", restaurantState);
  }

  disconnectedCallback() {
    console.log("disconnected reviewList");
    this.componentConnected = false;
    restaurantState.removeObserver(this);
  }

  render(state, selector) {
    console.log("render review list for: ", state.currentRestaurant);
    this.restaurant = state.currentRestaurant;
    this.innerHTML = Template.render(state);
    this.parent = document.getElementById(selector);
    this.parent.appendChild(this);

    for (let i = 0; i < this.restaurant.ratings.length; i++) {
      const review = this.restaurant.ratings[i];
      this.addReviewCard(review);
    }
  }

  addReviewCard(review) {
    console.log("add review card");
    this.parent = document.getElementById("reviewCol");
    const reviewCard = document.createElement("review-card");
    reviewCard.review = review;
    this.parent.appendChild(reviewCard);

    document.querySelector(`#${review.id} .stars-inner`).style.width = reviewCard.starPercentageRounded;
  }

  update(state) {
    console.log("update");
    if (this.componentConnected) {
      this.render(state, "reviewSlot");
    }
  }
}

if (!customElements.get("review-list")) {
  customElements.define("review-list", ReviewList);
}
