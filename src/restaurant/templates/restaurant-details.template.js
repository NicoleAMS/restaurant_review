export default {
  render(restaurant) {
    return `${this.html(restaurant)}`;
  },

  html(restaurant) {
    return `
    <div class="container main">
      <div class="row">
        <div class="col col-4">
          <div id="map" type="details" lat="${restaurant.lat}" long="${restaurant.long}"></div>
          <button id="backBtn" class="btn btn-primary mt-4">Back to List</button>
        </div>
        <div class="col col-8">
          <div class="card" id="card_${restaurant.id}">
            <div class="card-header bg-light"> 
              <h4 class="card-title text-primary">${restaurant.restaurantName}</h4>
            </div>
            <div class="card-body container">
              <div class="row">
                <div class="col col-6" id="reviews"></div>
                <div class="col col-6" id="streetView">
                  <img id="streetViewImg">
                  <button class="btn btn-primary btn-block mt-3">Write a review</button>
                </div>
              </div>
            </div>
          </div>
          <div id="review_form_${restaurant.id}" class="mx-3 my-5">
          </div>
        </div>
      </div>
    </div>
    `;
  }
}