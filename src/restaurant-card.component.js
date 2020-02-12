class RestaurantCard extends HTMLElement {
	constructor() {
		super();
		this.starTotal = 5;
	}

  set restaurant(restaurant) {
		restaurant.element = this;
		this.ratings = restaurant.ratings;
		this.starPercentage = (restaurant.average / this.starTotal) * 100;
		this.starPercentageRounded = `${Math.round(this.starPercentage / 10) * 10}%`;

    this.innerHTML = `
		<div class="card bg-default my-2 id_${restaurant.id}">
			<h4 class="card-header text-primary bg-light">${restaurant.restaurantName}</h4>
			<div class="card-body">
				<p>${restaurant.address}</p>
				<div class="icon stars-outer">
					<div class="icon stars-inner"></div>
				</div>
				<small class="text-muted">(${restaurant.ratings.length} reviews)</small>
			</div>
		</div>
		`;
	}
	
}

customElements.define("restaurant-card", RestaurantCard);