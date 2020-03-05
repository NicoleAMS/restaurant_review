export class Review {
  constructor({ restaurantID, name, email, comment, rating }) {
    this.restaurantID = restaurantID;
    this.name = name;
    this.email = email;
    this.comment = comment;
    this.rating = rating;
  }
}