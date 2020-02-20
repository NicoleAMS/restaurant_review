class RestaurantDetails extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant) {
    this.RestaurantDetails = restaurant;
    this.innerHTML = `
      <div class="card" id="card_${restaurant.id}">
        <div class="card-header bg-light"> 
          <h4 class="card-title text-primary">${restaurant.restaurantName}</h4>
        </div>
        <div class="card-body container">
          <div class="row">
            <div class="col col-6" id="reviews"></div>
            <div class="col col-6" id="streetView">
              <img id="streetViewImg">
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("restaurant-details", RestaurantDetails);

