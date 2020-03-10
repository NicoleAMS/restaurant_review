import { Review } from "../review.class";
import { allRestaurants } from "../..";

class ReviewForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
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
  `;

    this.name = this.querySelector("#review-name");
    this.email = this.querySelector("#review-email");
    this.comment = this.querySelector("#review-comment");
    this.star_rating = this.querySelector("#review_form").elements["star_rating"];
    this.review;
    this.restaurantID; 

    const reviewFormSubmitBtn = this.querySelector("#review-form-submit");
    reviewFormSubmitBtn.addEventListener("click", e => {
      e.preventDefault();
      const review = this.createReviewObject();
      this.createReviewCard({stars: review.stars, comment: review.comment});
    });
  }

  createReviewCard(review) {
    console.log(this);
    const reviewCard = document.createElement('review-card');
    reviewCard.review = review;
    // const container = this.parentNode.querySelector("#reviews");
    // container.appendChild(reviewCard);
    const reviewID = this.parentNode.id.split("_");
    const restaurantID = parseInt(reviewID[reviewID.length - 1]);
    this.review.restaurantID = restaurantID;
    const foundRestaurant = allRestaurants.find((restaurant) => {
      return restaurant.id === restaurantID;
    });
    foundRestaurant.ratings.push({stars: review.stars, comment: review.comment});
    console.log(foundRestaurant);
    return reviewCard;
  }

  createReviewObject() {
    this.review = new Review ({
      name: this.name.value,
      email: this.email.value,
      comment: this.comment.value,
      stars: parseInt(this.star_rating.value)
    });
    // console.log(this.review);
    return this.review;
  }

}

customElements.define("review-form", ReviewForm);
