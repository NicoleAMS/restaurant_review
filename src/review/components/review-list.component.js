import Template from "../templates/review-list.template";
import { restaurantState } from "../../utils/event-listeners.js";

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

    const sortedReviews = this.sortReviewsByTime(this.restaurant.ratings);

    for (let i = 0; i < sortedReviews.length; i++) {
      const review = this.restaurant.ratings[i];
      this.addReviewCard(review);
    }
  }

  sortReviewsByTime(ratings) {
    // uses bubble sort (desc)
    for (let i = 0; i < ratings.length; i++) {
      for (let j = 0; j < (ratings.length - i - 1); j++) {
        if (ratings[j].timestamp < ratings[j + 1].timestamp) {
          let temp = ratings[j];
          ratings[j] = ratings[j + 1];
          ratings[j + 1] = temp;
        }
      }
    }
    return ratings;
  }

  addReviewCard(review) {
    // in review, stars are still correct
    console.log("add review card for: ", review);
    this.parent = document.getElementById("reviewCol");
    const reviewCard = document.createElement("review-card");
    reviewCard.review = review;
    this.parent.appendChild(reviewCard);
    console.log("review element: ", document.querySelector(`${review.id} .stars-inner`));
    console.log("review star percentage rounded: ", reviewCard.starPercentageRounded);

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
