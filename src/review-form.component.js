import { Review } from "./review.class";

class ReviewForm extends HTMLElement {
  constructor() {
    super();
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
  }

  connectedCallback() {
    this.name = document.getElementById("review-name");
    this.email = document.getElementById("review-email");
    this.comment = document.getElementById("review-comment");
    this.star_rating = document.getElementById("review_form").elements["star_rating"];

    const reviewFormSubmitBtn = document.getElementById("review-form-submit");
    reviewFormSubmitBtn.addEventListener("click", e => {
      e.preventDefault();
      this.review = new Review ({
        name: this.name.value,
        email: this.email.value,
        comment: this.comment.value,
        rating: this.star_rating.value
      });
      console.log(this.review);
      return this.review;
    });
  }

}

customElements.define("review-form", ReviewForm);
