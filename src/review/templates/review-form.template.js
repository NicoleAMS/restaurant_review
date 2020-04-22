export default {
  render() {
    return `${this.html()}`;
  },

  mapDOM(scope) {
    // the scope parameter is the web components reference
    return {
      name: scope.querySelector("#review-name"),
      email: scope.querySelector("#review-email"),
      comment: scope.querySelector("#review-comment"),
      starRating: scope.querySelector("#review_form").elements["star_rating"],
      submitButton: scope.querySelector("#review-form-submit")
    };
  },

  html() {
    return `
      <div class="card bg-light">
        <div class="card-body">
          <form id="review_form">
            <div class="form-group row">
              <h4 class="mb-3 col-6">Write a Review</h4>
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
      </div>
    `;
  }
};
