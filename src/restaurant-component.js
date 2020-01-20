class RestaurantComponent extends HTMLElement {
	
	set restaurant(restaurant) {
		console.log(restaurant);
		this.innerHTML = `
			<h4>${restaurant.restaurantName}</h4>
			<p>${restaurant.address}</p>
			<p>${restaurant.average} stars</p>
		`;
	}
}

customElements.define("restaurant-component", RestaurantComponent);
