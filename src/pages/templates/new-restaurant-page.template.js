export default {
  render() {
    return `${this.html()}`;
  },

  mapDOM(scope) {
    // the scope parameter is the web components reference
    return {
      form: scope.querySelector("#newRestaurantForm"),
      name: scope.querySelector("#inputName"),
      address: scope.querySelector("#inputAddress")
    };
  },

  html() {
    return `
      <div class="container">
        <div class="row mb-5">
          <div class="col col-12">
            <h3 class="mb-3 text-uppercase">Create New Restaurant</h3>
            <p>Click on the map to select the location of the new restaurant, then fill in the form and click submit.</p>
          </div>
        </div>
        <div class="row">
          <div class="col col-8">
            <div id="map" type="new"></div>
          </div>
          <div class="col col-4" id="formContainer">
            <form id="newRestaurantForm" class="mt-3">  
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
}