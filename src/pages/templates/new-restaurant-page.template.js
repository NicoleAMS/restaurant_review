export default {
  render() {
    return `${this.html()} ${this.css()}`;
  },

  mapDOM(scope) {
    // the scope parameter is the web components reference
    return {
      form: scope.querySelector("#newRestaurantForm"),
      name: scope.querySelector("#inputName"),
      address: scope.querySelector("#inputAddress"),
      button: scope.querySelector("#homeBtn")
    };
  },

  html() {
    return `
      <div class="container">
        <div class="row breadcrumbs mb-3">
          <div class="col col-12">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item text-primary homeBtn" id="homeBtn">Home</li>
                <li class="breadcrumb-item active" aria-current="page">Create New Restaurant</li>
              </ol>
            </nav>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col col-12">
            <h3 class="mb-3 text-uppercase text-new-r">Create New Restaurant</h3>
            <p>Click on the map to select the location of the new restaurant, then fill in the form and click submit.</p>
          </div>
        </div>
        <div class="row">
          <div class="col col-lg-8 col-12">
            <div id="map" type="new"></div>
          </div>
          <div class="col col-lg-4 col-12" id="formContainer">
            <form id="newRestaurantForm" class="mt-3">  
              <h5 class="text-uppercase mb-3">New restaurant</h5>
              <div class="form-group">
                <input type="text" class="form-control" id="inputName" placeholder="Restaurant Name" required>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" id="inputAddress" placeholder="Restaurant Address" required>
              </div>
              <button type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
            </form>
          </div>
        </div>
        <div class="row">
        </div>
      </div>
    `;
  },

  css() {
    return `
      <style>
        @media only screen and (max-width: 991px) {
          #formContainer {
            margin-top: 30px;
          }
        }

        @media only screen and (max-width: 425px) {
          .text-new-r h3 {
            font-size: 1.5rem;
          }
        }
      </style>
    `;
  },

  createHelpText() {
    const helpText = document.createElement("div");
    helpText.style.marginTop = "15px";
    helpText.innerHTML = `
      <small class="row">
        <span class="col col-1 text-secondary pr-0">*</span> 
        <span class="col col-11 px-0">Please click on the map for the location of the new restaurant.</span>
      </small>`;
    return helpText;
  }
};
