import Template from "../templates/restaurant-list.template";
import { restaurantState } from "../../utils/event-listeners.js";

class RestaurantList extends HTMLElement {
  constructor() {
    super();
  }

  set componentConnected(componentConnected) {
    this._componentConnected = componentConnected;
  }

  get componentConnected() {
    return this._componentConnected;
  }

  connectedCallback() {
    this.componentConnected = true;
    restaurantState.addObserver(this);

    const btn = document.querySelector("#addRestaurant");
    btn.addEventListener("click", this.onAddRestaurant);
  }

  disconnectedCallback() {
    this.componentConnected = false;
    restaurantState.removeObserver(this);
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
    if (this.componentConnected) {
      this.render(state, "homepageSlot");
    }
  }

  addRestaurantCard(restaurant) {
    this.parent = document.getElementById("restaurantCol");
    this.parent.appendChild(restaurant);
  }

  onAddRestaurant() {
    const addRestaurantEvent = new CustomEvent("addRestaurant", {
      bubbles: true
    });
    event.target.dispatchEvent(addRestaurantEvent);
  }
}

if (!customElements.get("restaurant-list")) {
  customElements.define("restaurant-list", RestaurantList);
}
