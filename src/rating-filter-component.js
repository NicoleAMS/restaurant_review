class RatingFilterComponent extends HTMLElement {
  set filter(filter) {
    this.innerHTML = `
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
  }
}

customElements.define("filter-component", RatingFilterComponent);
