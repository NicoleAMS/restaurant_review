import Template from "../templates/restaurant-list.template";

class RestaurantList extends HTMLElement {
  constructor() {
    super();
  }

  set active(active) {
    this._active = active;
  } 

  get active() {
    return this._active;
  }

  connectedCallback() {
    this.active = true;

    const btn = document.querySelector("#addRestaurant");
    btn.addEventListener("click", this.onAddRestaurant);
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

  onAddRestaurant() {
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
