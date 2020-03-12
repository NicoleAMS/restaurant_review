export class Review {
  constructor({ restaurant, name, email, comment, stars }) {
    this.restaurant = restaurant;
    this.name = name;
    this.email = email;
    this.comment = comment;
    this.stars = stars;
  }
}