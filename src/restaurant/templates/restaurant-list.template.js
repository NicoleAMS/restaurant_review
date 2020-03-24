export default {
  render() {
    return `${this.html()}`;
  },

  html() {
    return `
      <div class="container main">
        <div class="row mb-5">
          <div class="col col-6 offset-6 d-flex justify-content-end text-primary" id="filterDiv">
            <min-max-select></min-max-select>
          </div>
        </div>
        <div class="row">
          <div class="col col-4">
            <div id="map" type="list"></div>
            <button id="addRestaurant" class="btn btn-primary mt-4">Add Restaurant</button>
          </div>
          <div id="restaurantCol" class="col col-8"></div>
        </div>
      </div>
    `;
  }
}