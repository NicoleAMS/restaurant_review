export default {
  render(review, starInnerWidth, date) {
    return `${this.html(review, date)} ${this.css(review, starInnerWidth)}`;
  },

  html(review, date) {
    return `
      <div class="media">
        <img src="${review.picture}" id="profile-picture" class="align-self-center mr-3" alt="profile picture">
        <div class="media-body">
          <div class="icon stars-outer mb-3" id="${review.id}">
            <div class="icon stars-inner"></div>
          </div>
          <p>${review.comment}</p>
          <p><strong>${review.name}</strong></p>
          <small class="text-muted">${date}</small>
        </div>
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

        #profile-picture {
          width: 90px;
          border-radius: 50%;
          border: 3px solid #f2d11d;
        }

        @media only screen and (max-width: 425px) {
          .media {
            display: block;
            text-align: center;
          }
        }
      </style>
    `;
  }
};

