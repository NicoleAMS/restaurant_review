class RestaurantDetails extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant) {
    this.RestaurantDetails = restaurant;
    this.innerHTML = `
		<div class="card bg-default my-2">
			<h4 class="card-header text-primary bg-light restaurant-name">${restaurant.restaurantName}</h4>
			<div class="card-body"></div>
		</div>
    `;
  }
}

customElements.define("restaurant-details", RestaurantDetails);
