export default {
  render(restaurant) {
    return `${this.html(restaurant)}`;
  },

  mapDOM(scope) {
    // the scope parameter is the web components reference
    return {
      button: scope.querySelector("#backBtn")
    };
  },

  html(restaurant) {
    return `
      <div class="container" id="container-${restaurant.id}">

        <div class="row breadcrumbs mb-5">
          <div class="col col-12">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item text-primary homeBtn" id="backBtn">Home</li>
                <li class="breadcrumb-item active" aria-current="page">${restaurant.restaurantName}</li>
              </ol>
            </nav>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col col-12">
            <h3 class="mb-3 text-uppercase">${restaurant.restaurantName}</h3>
          </div>
        </div>

        <div class="row mb-5">
          <div class="col col-12">
            <img src="https://picsum.photos/id/163/1000/200" width="100%">
          </div>
        </div>

        <div class="row">
          <div class="col col-4">
            <div class="card bg-default">
              <h4 class="card-header text-primary bg-light">Location</h4>
              <div class="card-body">
                <div class="col col-12 px-0 mb-3" id="streetView">
                  <img id="streetViewImg">
                </div>
                <div id="map" type="details" lat="${restaurant.lat}" long="${restaurant.long}"></div>
                <p class="mt-3"><strong>Address: </strong>${restaurant.address}</p>
              </div>
            </div>
          </div>
          <div class="col col-8">
            <div id="reviewSlot"></div>
            <div id="reviewForm" class="mt-3"></div>
          </div>
        </div>

      </div>
      
    `;
  }, 
};