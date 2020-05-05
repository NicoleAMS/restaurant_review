import Template from "../templates/detailspage.template";
import { initMap } from "../../google_maps/google_maps.js";

class DetailsPage extends HTMLElement {
  constructor() {
    super();
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
  }

  get restaurant() {
    return this._restaurant;
  }

  set dom(dom) {
    this._dom = dom;
  }

  get dom() {
    return this._dom;
  }

  connectedCallback() {
    if (window.google) {
      initMap();
    }
  }

  render(state, selector) {
    this.restaurant = state.currentRestaurant;
    this.innerHTML = Template.render(this.restaurant);
    this.parent = document.getElementById(selector);
    this.parent.innerHTML = "";
    this.parent.appendChild(this);

    this.addStreetView(this.restaurant);

    this.dom = Template.mapDOM(this);
    this.dom.button.addEventListener(
      "click",
      this.showRestaurantList.bind(this)
    );

    const reviewList = document.createElement("review-list");
    reviewList.render(state, "reviewSlot");

    const formContainer = document.getElementById("reviewForm");
    const form = document.createElement("review-form");
    form.restaurant = this.restaurant;
    formContainer.appendChild(form);
  }

  addStreetView(restaurant) {
    const streetViewImg = document.querySelector(
      `#container-${restaurant.id} #streetViewImg`
    );
    const google_api_key = process.env.GOOGLE_API_KEY;
    const streetViewSrc = `https://maps.googleapis.com/maps/api/streetview?size=500x400&location=${restaurant.lat},${restaurant.long}
    &key=${google_api_key}`;
    streetViewImg.src = streetViewSrc;
    return streetViewImg;
  }

  showRestaurantList(event) {
    const showRestaurantListEvent = new CustomEvent("showRestaurantList", {
      bubbles: true
    });
    event.target.dispatchEvent(showRestaurantListEvent);
  }
}

if (!customElements.get("details-page")) {
  customElements.define("details-page", DetailsPage);
}
