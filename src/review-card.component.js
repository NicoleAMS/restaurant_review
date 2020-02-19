class ReviewCard extends HTMLElement {
  constructor() {
    super();
    this.starTotal = 5;
  }

  set review(review) {
    this.starPercentage = (review.stars / this.starTotal) * 100;
    this.starPercentageRounded = `${Math.round(this.starPercentage / 10) *
      10}%`;
    this.innerHTML = `
      <p>${review.comment}</p>
      <div class="icon stars-outer mb-3" id="${review.id}">
        <div class="icon stars-inner"></div>
      </div>
      <div class="dropdown-divider"></div>
    `;
  }
}

customElements.define("review-card", ReviewCard);