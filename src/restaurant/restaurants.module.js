import { addMarkerWithInfoWindow } from "../google_maps/google_maps";
import { Restaurant } from "./restaurant.class";

export default {
  createRestaurant(rest) {
    const restaurant = new Restaurant({
      id: rest.id,
      name: rest.restaurantName,
      address: rest.address,
      lat: rest.lat,
      long: rest.long,
      ratings: rest.ratings
    });
    return restaurant;
  },

  setRestaurantsOnMap(viewportBounds, restaurants) {
    this.restaurantsOnMap = [];
    restaurants.forEach(restaurant => {
      var restaurantLatLng = new google.maps.LatLng({
        lat: restaurant.lat,
        lng: restaurant.long
      });
      if (viewportBounds.contains(restaurantLatLng)) {
        this.restaurantsOnMap.push(restaurant);
      }
    });
    return this.restaurantsOnMap;
  },

  displayRestaurantMarkers(restaurants, map) {
    restaurants.forEach(restaurant => {
      const restaurantMarker = restaurant.createRestaurantMarker(map);
      const marker = addMarkerWithInfoWindow(restaurantMarker);
      restaurant.marker = marker;
      map.markers.push(marker);
    });
  },

  filterRestaurantList(restaurants, min, max) {
    const filteredRestaurants = restaurants.filter(restaurant => {
      const average = restaurant.averageRating;
      return average >= min && average <= max;
    });
    return filteredRestaurants;
  },

  showRestaurantCard(restaurant, restaurantColumn) {
    restaurantColumn.appendChild(restaurant.restaurantCard);
  },

  showRestaurantDetails(restaurant, state) {
    const main = document.querySelector("main");
    main.innerHTML = "";
    const element = document.createElement("restaurant-details");
    element.restaurant = restaurant;
    main.appendChild(element);

    //add google street view
    this.addStreetView(restaurant);

    // clear card's body text
    const detailsBody = document.querySelector(
      `restaurant-details #card_${restaurant.id} .card-body #reviews`
    );
    detailsBody.innerHTML = "";

    // adds reviews to card
    for (let i = 0; i < restaurant.ratings.length; i++) {
      this.addReviewCard(restaurant, i, detailsBody);
    }

    // add form
    const formContainer = document.getElementById(
      `review_form_${restaurant.id}`
    );
    const form = document.createElement("review-form");
    form.restaurant = restaurant;
    formContainer.appendChild(form);
  },

  addReviewCard(restaurant, index, parent) {
    const ratingEl = document.createElement("review-card");
    ratingEl.review = restaurant.ratings[index];
    parent.appendChild(ratingEl);

    document.querySelector(
      `#${restaurant.ratings[index].id} .stars-inner`
    ).style.width = ratingEl.starPercentageRounded;
  },

  addStreetView(restaurant) {
    const streetViewImg = document.querySelector(
      `restaurant-details #card_${restaurant.id} .card-body #streetViewImg`
    );
    const google_api_key = process.env.GOOGLE_API_KEY;
    const streetViewSrc = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${restaurant.lat},${restaurant.long}
    &key=${google_api_key}`;
    streetViewImg.src = streetViewSrc;
    return streetViewImg;
  }
};
