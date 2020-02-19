export class Restaurant {
  constructor({ id, name, address, lat, long, ratings, photos }) {
    this.id = id;
    this.restaurantName = name;
    this.address = address;
    this.lat = lat;
    this.long = long;
    this.ratings = ratings;
    this.averageRating = this.calculateAverageRating(this.ratings);
    this.photos = photos;
    this.restaurantCard = this.createRestaurantCard();
    this.restaurantDetails = this.createRestaurantDetails();
    this.ratingCards = this.create

    this.addIDtoRatings();
  }

  addIDtoRatings() {
    for (let i = 0; i < this.ratings.length; i++) {
      this.ratings[i].id = `rating_${i}`;
    }
  }

  calculateAverageRating(ratings) {
    let average = 0;
    ratings.forEach(rating => {
      average += rating.stars;
    });
    average = average / ratings.length;
    return average;
  }

  createRestaurantCard() {
    const element = document.createElement("restaurant-card");
    element.restaurant = this;
    return element;
  }

  createRestaurantDetails() {
    return document.createElement("restaurant-details");
  }

  createRestaurantMarker(map) {
    const restaurantMarker = {
      coords: { lat: this.lat, lng: this.long },
      icon: {
        url:
          "https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-1-small.png,assets/icons/poi/tactile/pinlet_outline_v2-1-small.png,assets/icons/poi/tactile/pinlet-1-small.png,assets/icons/poi/quantum/pinlet/restaurant_pinlet-1-small.png&highlight=ff000000,ffffff,F1D11F,ffffff?scale=1.75"
      },
      map: map,
      content: `<p>${this.restaurantName}</p>`
    };
    return restaurantMarker;
  }
}
