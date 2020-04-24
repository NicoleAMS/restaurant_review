import Template from "../templates/review-list.template";

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
  }

  disconnectedCallback() {
    this.componentConnected = false;
  }

  render(state, selector) {
    this.restaurant = state.currentRestaurant;
    this.innerHTML = Template.render(state);
    this.parent = document.getElementById(selector);
    this.parent.appendChild(this);

    console.log("restaurant: ", this.restaurant);

    for (let i = 0; i < this.restaurant.ratings.length; i++) {
      const review = this.restaurant.ratings[i];
      this.addReviewCard(review);
    }
  }

  addReviewCard(review) {
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
