import Template from "../templates/homepage.template";
import { initMap } from "../../google_maps/google_maps.js";

class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (window.google) {
      initMap();
    }
  }

  render(state, selector) {
    this.innerHTML = Template.render(state);
    this.parent = document.getElementById(selector);
    this.parent.appendChild(this);

    const restaurantList = document.createElement("restaurant-list");
    restaurantList.render(state, "homepageSlot");
  }
}

if (!customElements.get("home-page")) {
  customElements.define("home-page", HomePage);
}
