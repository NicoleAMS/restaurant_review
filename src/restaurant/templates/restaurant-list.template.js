export default {
  render() {
    return `${this.html()}`;
  },

  mapDOM(scope) {
    // the scope parameter is the web components reference
    return {
      addRestaurant: scope.querySelector("#addRestaurant"),
    };
  },

  html() {
    return `
      <div id="restaurantCol" class="col col-12"></div>
    `;
  }
}