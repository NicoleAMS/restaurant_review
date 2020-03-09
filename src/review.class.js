export class Review {
  constructor({ restaurantID, name, email, comment, stars }) {
    this.restaurantID = restaurantID;
    this.name = name;
    this.email = email;
    this.comment = comment;
    this.stars = stars;
  }
}