class RatingFilterComponent extends HTMLElement {
  set filter(filter) {
    this.innerHTML = `
			<form class="d-flex">
				<select class="custom-select mx-2" id="minStarSelect">
					<option selected>Select minimum star rating</option>
					<option value="1">One star</option>
					<option value="2">Two stars</option>
					<option value="3">Three stars</option>
					<option value="4">Four stars</option>
					<option value="5">Five stars</option>
				</select>
				<select class="custom-select mx-2" id="maxStarSelect">
					<option selected>Select maximum star rating</option>
					<option value="1">One star</option>
					<option value="2">Two stars</option>
					<option value="3">Three stars</option>
					<option value="4">Four stars</option>
					<option value="5">Five stars</option>
				</select>
			</form>
		`;
  }
}

customElements.define("filter-component", RatingFilterComponent);
