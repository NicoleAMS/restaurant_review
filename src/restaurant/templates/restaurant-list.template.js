export default {
  render() {
    return `${this.html()}`;
  },

  html() {
    return `
      <div class="container main">
        <div class="row">
          <div id="restaurantCol" class="col col-12"></div>
        </div>
      </div>
    `;
  }
}