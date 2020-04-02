import Template from "./min-max-select.template.js";

class MinMaxSelect extends HTMLElement {
  constructor() {
    super();
    this.minimum = 1;
    this.maximum = 5;
  }

  connectedCallback() {
    console.log('filtered connected');
    
    this.innerHTML = Template.render();
    this.dom = Template.mapDOM(this);

    this.dom.minStarSelect.addEventListener("change", this._onMinChange.bind(this));

    this.dom.maxStarSelect.addEventListener("change", this._onMaxChange.bind(this));
  }

  _onMinChange(event) {
    console.log('on min change => ', this.minimum, this.maximum);
    this.minimum = event.target.value;
    console.log('min target updated: ', this.minimum, this.maximum);
    this.updateMaxSelect();

    const minChangeEvent = new CustomEvent("onMinChange", {
      bubbles: true,
      detail: { min: this.minimum, max: this.maximum }
    });
    event.target.dispatchEvent(minChangeEvent);

    console.log('after min change event dispatched: ', this.minimum, this.maximum);
  }

  _onMaxChange() {
    console.log('on max change => ', this.minimum, this.maximum);
    this.maximum = event.target.value;
    console.log('max target updated: ', this.minimum, this.maximum);

    const maxChangeEvent = new CustomEvent("onMaxChange", {
      bubbles: true,
      detail: { min: this.minimum, max: this.maximum }
    });
    event.target.dispatchEvent(maxChangeEvent);

    console.log('after max change event dispatched: ', this.minimum, this.maximum);
  }

  updateMaxSelect() {
    console.log(this.minimum);
    for (let i = 1; i <= this.maximum; i++) {
      const element = this.querySelector(`#maxStar${i}`);
      console.log(element);
      if (i < this.minimum) {
        element.disabled = true;
      } else {
        element.disabled = false;
      }
    }
  }
}

customElements.define("min-max-select", MinMaxSelect);
