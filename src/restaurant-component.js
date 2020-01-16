class RestaurantComponent extends HTMLElement {
	
	set restaurant(restaurant) {
		this.innerHTML = `
			<h4>${restaurant.restaurantName}</h4>
			<p>${restaurant.address}</p>
		`;
	}
}

customElements.define("restaurant-component", RestaurantComponent);
