export default {
  render() {
    return `${this.html()} ${this.css()}`;
  },

  html() {
    return `
      <div class="container">
        <div class="row breadcrumbs mb-3">
          <div class="col col-12">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Home</li>
              </ol>
            </nav>
          </div>
        </div>
        <div class="row">
          <div class="col col-lg-9 col-12 text-primary mb-3" id="filterDiv">
            <min-max-select></min-max-select>
          </div>
          <div class="col col-lg-3 col-12 text-primary mb-5 button-div">
            <button id="addRestaurant" class="btn btn-primary">Add Restaurant</button> 
          </div>
        </div>
        <div class="row">
          <div class="col col-lg-4 col-12">
            <div id="map" type="list"></div>
          </div>
          <div class="col col-lg-8 col-12" id="homepageSlot"></div>
        </div>
      </div>
    `;
  },

  css() {
    return `
      <style>
        @media only screen and (max-width: 991px) {
          #homepageSlot {
            margin-top: 40px;
          }

          .button-div {
            text-align: end;
          }
        }
      </style>
    `;
  }
};
