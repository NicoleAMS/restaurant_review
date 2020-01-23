
export function calculateAverageRating(ratings) {
	let average = 0;
	ratings.forEach(rating => {
		average += rating.stars;
	});
	average = average / ratings.length;
	return average;
}