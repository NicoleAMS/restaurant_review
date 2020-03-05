class RestaurantDetails extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant) {
    this.restaurantDetails = restaurant;
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
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
  }

  getReviewFormValues() {
    // const star_rating = document.getElementById("review_form").elements[
    //   "star_rating"
    // ];
    // document.getElementById("review-name").addEventListener("change", e => {
    //   this.name = e.target.value;
    // });
    // document.getElementById("review-email").addEventListener("change", e => {
    //   this.email = e.target.value;
    // });
    // document.getElementById("review-comment").addEventListener("change", e => {
    //   this.comment = e.target.value;
    // });
    // const reviewFormSubmitBtn = document.getElementById("review-form-submit");
    // reviewFormSubmitBtn.addEventListener("click", e => {
    //   e.preventDefault();
    //   const review = {
    //     name: this.name,
    //     email: this.email,
    //     comment: this.comment,
    //     rating: star_rating.value,
    //     restaurantID: this.restaurantDetails.id
    //   }
    //   console.log(review);
    //   return review;
    // });
  }
}

customElements.define("restaurant-details", RestaurantDetails);
