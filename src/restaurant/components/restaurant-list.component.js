import Template from "../templates/restaurant-list.template";

class RestaurantList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.active = true;

    this.btn = document.querySelector("#addRestaurant");
    this.btn.addEventListener("click", this._onAddRestaurant);
  }

  disconnectedCallback() {
    this.active = false;
  }

  render(state, selector) {
    this.innerHTML = Template.render(state);
    this.parent = document.getElementById(selector);
    this.parent.appendChild(this);

    for (let i = 0; i < state.filteredRestaurants.length; i++) {
      this.addRestaurantCard(state.filteredRestaurants[i].restaurantCard);
    }
  }

  update(state) {
    if (this.active) {
      this.render(state, "homepageSlot");
    }
  }

  addRestaurantCard(restaurant) {
    this.parent = document.getElementById("restaurantCol");
    this.parent.appendChild(restaurant);
  }

  _onAddRestaurant() {
    const addRestaurantEvent = new CustomEvent("addRestaurant", {
      bubbles: true,
    });
    event.target.dispatchEvent(addRestaurantEvent);
  }

  // removeRestaurantListener() {
  //   this.btn.removeEventListener("click", this._onAddRestaurant);
  // }

}

if (!customElements.get("restaurant-list")) {
  customElements.define("restaurant-list", RestaurantList);
}
