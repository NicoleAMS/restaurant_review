class RestaurantComponent extends HTMLElement {
  set restaurant(restaurant) {
    console.log(restaurant);
    this.innerHTML = `
		<div class="card bg-default my-2">
			<h4 class="card-header text-primary bg-light">${restaurant.restaurantName}</h4>
			<div class="card-body">
				<p>${restaurant.address}</p>
				<p class="text-primary">${restaurant.average} stars</p>
			</div>
		</div>
		`;
  }
}

customElements.define("restaurant-component", RestaurantComponent);
