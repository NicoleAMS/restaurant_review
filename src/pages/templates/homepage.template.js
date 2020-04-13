export default {
  render() {
    return `${this.html()}`;
  },

  html() {
    return `
      <div class="container">
        <div class="row">
          <div class="col col-12 d-flex justify-content-end text-primary mb-5" id="filterDiv">
            <min-max-select></min-max-select>
            <button id="addRestaurant" class="btn btn-primary">Add Restaurant</button>
          </div>
        </div>
        <div class="row">
          <div class="col col-4">
            <div id="map" type="list"></div>
          </div>
          <div class="col col-8" id="homepageSlot"></div>
        </div>
      </div>
    `;
  }
};