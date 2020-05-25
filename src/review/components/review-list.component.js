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
  }

  disconnectedCallback() {
    this.componentConnected = false;
    restaurantState.removeObserver(this);
  }

  render(state, selector) {
    this.restaurant = state.currentRestaurant;
    this.innerHTML = Template.render(state);
    this.parent = document.getElementById(selector);
    this.parent.appendChild(this);

    const sortedReviews = this.sortReviewsByTime(this.restaurant.ratings);

    if (sortedReviews.length === 0) {
      this.parent = document.getElementById("reviewCol");
      this.parent.innerHTML = `<p>This restaurant has no reviews yet.</p>`;
    } else {
      for (let i = 0; i < sortedReviews.length; i++) {
        const review = this.restaurant.ratings[i];
        this.addReviewCard(review);
      }
    }
  }

  sortReviewsByTime(ratings) {
    // uses bubble sort (desc)
    for (let i = 0; i < ratings.length; i++) {
      for (let j = 0; j < ratings.length - i - 1; j++) {
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
    this.parent = document.getElementById("reviewCol");
    const reviewCard = document.createElement("review-card");
    reviewCard.review = review;
    this.parent.appendChild(reviewCard);

    document.querySelector(`#${review.id} .stars-inner`).style.width =
      reviewCard.starPercentageRounded;
  }

  update(state) {
    if (this.componentConnected) {
      this.render(state, "reviewSlot");
    }
  }
}

if (!customElements.get("review-list")) {
  customElements.define("review-list", ReviewList);
}
