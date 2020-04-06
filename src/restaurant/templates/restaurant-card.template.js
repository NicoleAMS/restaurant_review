export default {
  render(restaurant, starInnerWidth) {
    return `${this.html(restaurant)} ${this.css(restaurant, starInnerWidth)}`;
  },

  html(restaurant) {
    return `
      <div class="card bg-default mb-3 id_${restaurant.id}">
        <h4 class="card-header text-primary bg-light restaurant-name">${restaurant.restaurantName}</h4>
        <div class="card-body">
          <p>${restaurant.address}</p>
          <div class="icon stars-outer">
            <div class="icon stars-inner"></div>
          </div>
          <small class="text-muted">(${restaurant.ratings.length} reviews, ${restaurant.averageRating} stars)</small>
        </div>
      </div>
    `;
  },

  css(restaurant, starInnerWidth) {
    return `
      <style>
        .id_${restaurant.id} .stars-inner {
          width: ${starInnerWidth}
        }
      </style>
    `;
  }
};
