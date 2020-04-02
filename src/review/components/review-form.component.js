import { Review } from "../review.class";
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

    this.dom.submitButton.addEventListener("click", e => {
      e.preventDefault();
      const review = this.createReviewObject();
      this.createReviewCard(review);
      this.clearForm();

      // custom event to update state & restaurantList
      this.onReviewCreated();
    });
  }

  onReviewCreated() {
    const reviewCreatedEvent = new CustomEvent("reviewCreated", {
      bubbles: true,
      detail: { restaurant: this._restaurant }
    });
    event.target.dispatchEvent(reviewCreatedEvent);
  }

  createReviewCard(review) {
    const reviewCard = document.createElement('review-card');
    reviewCard.review = review;
    const container = document.querySelector("restaurant-details #reviews");
    container.appendChild(reviewCard);

    this._restaurant.ratings.push(review);
    return reviewCard;
  }

  createReviewObject() {
    this.review = new Review ({
      // restaurant: this._restaurant,
      name: this.dom.name.value,
      email: this.dom.email.value,
      comment: this.dom.comment.value,
      stars: parseInt(this.dom.starRating.value)
    });
    // console.log(this.review);
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
