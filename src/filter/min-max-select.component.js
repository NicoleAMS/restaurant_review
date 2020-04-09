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

    this.dom.minStarSelect.addEventListener(
      "change",
      this._onMinChange.bind(this)
    );
    this.dom.maxStarSelect.addEventListener(
      "change",
      this._onMaxChange.bind(this)
    );
  }

  _onMinChange(event) {
    this.minimum = event.target.value;
    this.updateMaxSelect();

    const minChangeEvent = new CustomEvent("onMinChange", {
      bubbles: true,
      detail: { min: this.minimum, max: this.maximum }
    });
    event.target.dispatchEvent(minChangeEvent);
  }

  _onMaxChange() {
    this.maximum = event.target.value;

    const maxChangeEvent = new CustomEvent("onMaxChange", {
      bubbles: true,
      detail: { min: this.minimum, max: this.maximum }
    });
    event.target.dispatchEvent(maxChangeEvent);
  }

  updateMaxSelect() {
    for (let i = 1; i <= this.maximum; i++) {
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
