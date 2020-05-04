import Template from "../templates/review-card.template.js";

class ReviewCard extends HTMLElement {
  constructor() {
    super();
    this.starTotal = 5;
  }

  set review(review) {
    this._review = review;
  }

  get review() {
    return this._review;
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

  set dateString(date) {
    this._dateString = date;
  }

  get dateString() {
    return this._dateString;
  }

  connectedCallback() {
    this.starPercentage = (this.review.stars / this.starTotal) * 100;
    this.starPercentageRounded = `${Math.round(this.starPercentage / 10) *
      10}%`;
    this.dateString = this.convertTimestamp();
    this.innerHTML = Template.render(this.review, this.starPercentageRounded, this.dateString);
  }

  convertTimestamp() {
    const date = new Date(this.review.timestamp);
    return date.toLocaleString();
  }
}

customElements.define("review-card", ReviewCard);
