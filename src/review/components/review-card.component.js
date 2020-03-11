import Template from "../templates/review-card.template.js";

class ReviewCard extends HTMLElement {
  constructor() {
    super();
    this._starTotal = 5;
  }

  set review(review) {
    this._review = review;
  }

  connectedCallback() {
    this._starPercentage = (this._review.stars / this._starTotal) * 100;
    this._starPercentageRounded = `${Math.round(this._starPercentage / 10) *
      10}%`;
    this.innerHTML = Template.render(this._review, this._starPercentageRounded);
  }
}

customElements.define("review-card", ReviewCard);