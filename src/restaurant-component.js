class RestaurantComponent extends HTMLElement {
  set restaurant(restaurant) {
    this.innerHTML = `
		<div class="card bg-default my-2 id_${restaurant.id}">
			<h4 class="card-header text-primary bg-light">${restaurant.restaurantName}</h4>
			<div class="card-body">
				<p>${restaurant.address}</p>
				<div class="icon stars-outer">
					<div class="icon stars-inner"></div>
				</div>
				<span>(${restaurant.ratings.length})</span>
			</div>
		</div>
		`;
  }
}

customElements.define("restaurant-component", RestaurantComponent);
