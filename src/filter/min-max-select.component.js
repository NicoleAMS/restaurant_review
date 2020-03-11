import Template from "./min-max-select.template.js";

class MinMaxSelect extends HTMLElement {
  constructor() {
    super();
    this.minimum = 1;
    this.maximum = 5;
  }

  connectedCallback() {
    this.innerHTML = Template.render();
    this.dom = Template.mapDOM(this);

    this.dom.minStarSelect.addEventListener("change", e => {
      // set minimum star rating
      this.minimum = e.target.value;
      // update the max select values
      this.updateMaxSelect();
    });

    this.dom.maxStarSelect.addEventListener("change", e => {
      this.maximum = e.target.value;
    });
  }

  updateMaxSelect() {
    for (let i = this.minimum; i <= this.maximum; i++) {
      const element = this.querySelector(`#maxStar${i}`);
      if (i < this.minimum) {
        element.disabled = true;
      } else {
        element.disabled = false;
      }
    }
  }
}

customElements.define("min-max-select", MinMaxSelect);
