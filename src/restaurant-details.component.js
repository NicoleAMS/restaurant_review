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
              <button class="btn btn-primary btn-block mt-3">Write a review</button>
            </div>
          </div>
        </div>
      </div>
      <div id="review_form_${restaurant.id}" class="mx-3 my-5">
        <form>
          <div class="form-group row">
            <h4 class="mb-3 col-6">Review</h4>
            <div class="star_rating form-check col-6">
              <input type="radio" id="star5" name="Star_Rating_of_5_stars" class="star form-check-input" value="5">
              <label for="star5" class="star form-check-label" title="5 stars"></label>
              <input type="radio" id="star4" name="Star_Rating_of_5_stars" class="star form-check-input" value="4">
              <label for="star4" class="star form-check-label" title="4 stars"></label>
              <input type="radio" id="star3" name="Star_Rating_of_5_stars" class="star form-check-input" value="3">
              <label for="star3" class="star form-check-label" title="3 stars"></label>
              <input type="radio" id="star2" name="Star_Rating_of_5_stars" class="star form-check-input" value="2">
              <label for="star2" class="star form-check-label" title="2 stars"></label>
              <input type="radio" id="star1" name="Star_Rating_of_5_stars" class="star form-check-input" value="1">
              <label for="star1" class="star form-check-label" title="1 stars"></label>
            </div>
          </div>
          <div class="form-group">
            <input type="text" class="form-control" id="name" placeholder="Name">
          </div>
          <div class="form-group">
            <input type="email" class="form-control" id="email" placeholder="Email">
          </div>
          <div class="form-group">
            <textarea type="email" class="form-control" id="comment" placeholder="Comment"></textarea>
          </div>
          <input type="submit" value="Submit" class="btn btn-primary px-5">
        </form>
      </div>
    `;
  }
}

customElements.define("restaurant-details", RestaurantDetails);
