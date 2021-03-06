import Template from "../templates/review-form.template.js";

class ReviewForm extends HTMLElement {
  constructor() {
    super();
  }

  set dom(dom) {
    this._dom = dom;
  }

  get dom() {
    return this._dom;
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
  }

  get restaurant() {
    return this._restaurant;
  }

  set review(review) {
    this._review = review;
  }

  get review() {
    return this._review;
  }

  connectedCallback() {
    this.innerHTML = Template.render();
    this.dom = Template.mapDOM(this);

    this.dom.form.addEventListener("submit", this.onFormSubmit.bind(this));
  }

  onFormSubmit() {
    event.preventDefault();
    this.review = this.createReviewObject();
    this.createReviewCard();
    this.clearForm();

    // custom event to update state & restaurantList
    this.onReviewCreated();
  }

  onReviewCreated() {
    const reviewCreatedEvent = new CustomEvent("reviewCreated", {
      bubbles: true,
      detail: { restaurant: this.restaurant, review: this.review }
    });
    event.target.dispatchEvent(reviewCreatedEvent);
  }

  createReviewCard() {
    const reviewCard = document.createElement("review-card");
    reviewCard.review = this.review;
    const container = document.querySelector("review-list #reviewCol");
    container.appendChild(reviewCard);

    this.restaurant.ratings.push(this.review);
    return reviewCard;
  }

  createReviewObject() {
    return {
      id: `restaurant_${this.restaurant.id}_rating_${this.restaurant.ratings.length}`,
      restaurantID: this.restaurant.id,
      name: this.dom.name.value,
      email: this.dom.email.value,
      comment: this.dom.comment.value,
      stars: parseInt(this.dom.starRating.value),
      picture: "http://placekitten.com/200/200",
      timestamp: Date.now()
    };
  }

  clearForm() {
    this.dom.name.value = "";
    this.dom.email.value = "";
    this.dom.comment.value = "";
    this.dom.starRating.value = "3";
  }
}

customElements.define("review-form", ReviewForm);
