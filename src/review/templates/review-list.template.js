export default {
  render() {
    return `${this.html()}`;
  },

  html() {
    return `
      <div class="card bg-default">
        <h4 class="card-header text-primary bg-light">Reviews</h4>
        <div class="card-body">
          <div class="col col-12 px-0 mb-3" id="reviewCol">
        </div>
      </div>
    `;
  }
};
