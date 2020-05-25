import Subject from "./subject.js";

class State extends Subject {
  constructor() {
    super();
    this.state = {};
  }

  // updates the state.
  // calls the update method on each observer
  update(data = {}) {
    this.state = Object.assign(this.state, data);
    this.notify(this.state);
  }

  // get the state.
  getState() {
    return this.state;

  }
}

export default State;
