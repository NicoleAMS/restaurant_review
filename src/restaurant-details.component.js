class RestaurantDetails extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant) {
    this.innerHTML = `
		<div class="card bg-default my-2 details_id_${restaurant.id}">
			<h4 class="card-header text-primary bg-light restaurant-name">${restaurant.restaurantName}</h4>
			<div class="card-body"></div>
		</div>
    `;

    const cardBody = this.querySelector(".card-body");
    for (let i = 0; i < restaurant.ratings.length; i++) {
      console.log(restaurant.ratings[i]);
      cardBody.innerHTML += `
        <p>${restaurant.ratings[i].comment}</p>
        <div class="icon stars-outer">
          <div class="icon stars-inner"></div>
        </div>
      `;
    }
  }
}

customElements.define("restaurant-details", RestaurantDetails);