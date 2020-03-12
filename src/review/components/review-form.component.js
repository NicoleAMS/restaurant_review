import { Review } from "../review.class";
import { allRestaurants } from "../..";

import Template from "../templates/review-form.template.js";

class ReviewForm extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
  }

  connectedCallback() {
    this.innerHTML = Template.render();
    this.dom = Template.mapDOM(this);

    this._restaurant = allRestaurants.find((restaurant) => {
      return restaurant.id === parseInt(this.getAttribute("restaurant"));
    });

    this.dom.submitButton.addEventListener("click", e => {
      e.preventDefault();
      const review = this.createReviewObject();
      this.createReviewCard(review);
      this.clearForm();
    });
  }

  createReviewCard(review) {
    const reviewCard = document.createElement('review-card');
    reviewCard.review = review;
    const container = document.querySelector("restaurant-details #reviews");
    container.appendChild(reviewCard);

    this._restaurant.ratings.push(review);
    // console.log(this._restaurant);
    return reviewCard;
  }

  createReviewObject() {
    this.review = new Review ({
      restaurant: this._restaurant,
      name: this.dom.name.value,
      email: this.dom.email.value,
      comment: this.dom.comment.value,
      stars: parseInt(this.dom.starRating.value)
    });
    console.log(this.review);
    return this.review;
  }

  clearForm() {
    this.dom.name.value = "";
    this.dom.email.value = "";
    this.dom.comment.value = "";
    this.dom.starRating.value = "3";
  }

}

customElements.define("review-form", ReviewForm);
