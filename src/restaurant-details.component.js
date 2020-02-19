class RestaurantDetails extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant) {
    this.RestaurantDetails = restaurant;
    console.log(restaurant);
    this.innerHTML = `
    <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true" id="modal_${restaurant.id}">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content card">
          <h4 class="card-header text-primary bg-light">${restaurant.restaurantName}</h4>
          <div class="card-body"></div>
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define("restaurant-details", RestaurantDetails);

