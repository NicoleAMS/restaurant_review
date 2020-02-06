class RatingFilterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
		<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
			<form class="d-flex">
				<select class="custom-select mx-2" id="minStarSelect">
					<option selected disabled>Select minimum star rating</option>
					<option value="1">One star</option>
					<option value="2">Two stars</option>
					<option value="3">Three stars</option>
					<option value="4">Four stars</option>
					<option value="5">Five stars</option>
				</select>
				<select class="custom-select mx-2" id="maxStarSelect">
					<option selected disabled>Select maximum star rating</option>
					<option id="maxStar1" value="1">One star</option>
					<option id="maxStar2" value="2">Two stars</option>
					<option id="maxStar3" value="3">Three stars</option>
					<option id="maxStar4" value="4">Four stars</option>
					<option id="maxStar5" value="5">Five stars</option>
				</select>
			</form>
		`;

    this.minStarSelect = this.shadowRoot.getElementById("minStarSelect");
    this.maxStarSelect = this.shadowRoot.getElementById("maxStarSelect");
    this.minStarAverage = 0;
    this.maxStarAverage = 5;
  }

  updateMaxSelect() {
    for (let i = 1; i <= 5; i++) {
      const element = this.shadowRoot.getElementById(`maxStar${i}`);
      if (i < this.minStarAverage) {
        element.disabled = true;
      } else {
        element.disabled = false;
      }
    }
  }

  filterTool(array) {
    const filteredArray = array.filter(index => {
      const average = Math.round(index.average);
      return average >= this.minStarAverage && average <= this.maxStarAverage;
    });
    return filteredArray;
  }
}

customElements.define("filter-component", RatingFilterComponent);
