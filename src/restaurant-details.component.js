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
        <form id="review_form">
          <div class="form-group row">
            <h4 class="mb-3 col-6">Review</h4>
            <div class="star_rating form-check col-6">
              <input type="radio" id="star5" name="star_rating" class="star form-check-input" value="5">
              <label for="star5" class="star form-check-label" title="5 stars"></label>
              <input type="radio" id="star4" name="star_rating" class="star form-check-input" value="4">
              <label for="star4" class="star form-check-label" title="4 stars"></label>
              <input type="radio" id="star3" name="star_rating" class="star form-check-input" value="3" checked>
              <label for="star3" class="star form-check-label" title="3 stars"></label>
              <input type="radio" id="star2" name="star_rating" class="star form-check-input" value="2">
              <label for="star2" class="star form-check-label" title="2 stars"></label>
              <input type="radio" id="star1" name="star_rating" class="star form-check-input" value="1">
              <label for="star1" class="star form-check-label" title="1 stars"></label>
            </div>
          </div>
          <div class="form-group">
            <input type="text" class="form-control" id="review-name" placeholder="Name" required>
          </div>
          <div class="form-group">
            <input type="email" class="form-control" id="review-email" placeholder="Email" required>
          </div>
          <div class="form-group">
            <textarea type="email" class="form-control" id="review-comment" placeholder="Comment" required></textarea>
          </div>
          <input id="review-form-submit" type="submit" value="Submit" class="btn btn-primary px-5">
        </form>
      </div>
    `;
  }

  connectedCallback() {
    const review = this.getReviewFormValues();
  }

  getReviewFormValues() {
    const star_rating = document.getElementById("review_form").elements[
      "star_rating"
    ];
    document.getElementById("review-name").addEventListener("change", e => {
      this.name = e.target.value;
    });
    document.getElementById("review-email").addEventListener("change", e => {
      this.email = e.target.value;
    });
    document.getElementById("review-comment").addEventListener("change", e => {
      this.comment = e.target.value;
    });
    const reviewFormSubmitBtn = document.getElementById("review-form-submit");
    reviewFormSubmitBtn.addEventListener("click", e => {
      e.preventDefault();
      console.log(
        this.name +
          "\n" +
          this.email +
          "\n" +
          this.comment +
          "\n" +
          star_rating.value
      );
      console.log(this.RestaurantDetails);
    });
  }
}

customElements.define("restaurant-details", RestaurantDetails);
