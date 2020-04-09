export default {
  render(review, starInnerWidth) {
    return `${this.html(review)} ${this.css(review, starInnerWidth)}`;
  },

  html(review) {
    return `
      <p>${review.comment}</p>
      <div class="icon stars-outer mb-3" id="${review.id}">
        <div class="icon stars-inner"></div>
      </div>
      <div class="dropdown-divider"></div>
    `;
  },

  css(review, starInnerWidth) {
    return `
      <style>
        #${review.id} .stars-inner {
          width: ${starInnerWidth}
        }
      </style>
    `;
  }
};
