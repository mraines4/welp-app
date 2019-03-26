const db = require('./conn');

function getFirstNamebById(theId) {
    return db.any(`select first_name from users where id = ${theId}`);
}
// getFirstNamebById(1)
//     .then(console.log)

function getUserById(theId) {
    return db.any(`select * from users where id = ${theId}`);
};

// getUserById(3)
//     .then(console.log);
async function main() {
    const user3 = await getUserById(3);
    console.log(user3);
}
main();

function getFavByUserId(theId) {
    return db.any(`select usr.first_name ||' '|| usr.last_name as Name, res.name as Favorites from users usr inner join favorites fav on usr.id = fav.user_id inner join restaurants res on fav.restaurant_id = res.id where usr.id = ${theId}`)
};

// getFavByUserId(1)
//     .then(console.log);

function getAllReviewsByUserId(theId) {
    return db.any(`select usr.first_name ||' '|| usr.last_name as Name, res.name as Restaurant, rev.content, rev.score from users usr inner join reviews rev on rev.user_id = usr.id inner join restaurants res on res.id = rev.restaurant_id where usr.id = ${theId}`)
};

// getAllReviewsByUserId(1)
//     .then(console.log);

function getAllInfoForRestaurantById(theId) {
    return db.any(`select * from restaurants where id = ${theId}`)
};

// getAllInfoForRestaurantById(1)
//     .then(console.log);


function getAllReviewsForRestaurantById(theId) {
    return db.any(`select res.name, rev.content, rev.score, usr.first_name ||'  '|| usr.last_name as Reviewer from restaurants res inner join reviews rev on res.id = rev.restaurant_id inner join users usr on usr.id = rev.user_id where res.id = ${theId}`)
};

// getAllReviewsForRestaurantById(1)
//     .then(console.log);

function getAverageReviewforRestaurantById(theId) {
    return db.any(`select res.name, avg(rev.score) as Average
	from restaurants res
	inner join reviews rev
		on res.id = rev.restaurant_id
where res.id = ${theId}
group by res.name`)
};

// getAverageReviewforRestaurantById(2)
//     .then(console.log);

function getCountOfFavoritesForRestaurantById(theId) {
    return db.any(`select res.name, count(fav.user_id)
	from restaurants res
	inner join favorites fav
		on res.id = fav.restaurant_id
where res.id = ${theId}
group by res.name`)
};

// getCountOfFavoritesForRestaurantById(1)
//     .then(console.log);

function getRestaurantBySearchOfName(theName) {
    return db.any(`select distinct res.name, avg(rev.score), count(fav.user_id)
	from restaurants res
	inner join reviews rev
		on res.id = rev.restaurant_id
	inner join favorites fav
		on res.id = fav.restaurant_id
where res.name ilike '${theName}'
group by res.name, fav.user_id`)
};

// getRestaurantBySearchOfName('applebees')
//     .then(console.log);

function limitByMinimumReview(score) {
    return db.any(`select distinct res.name, avg(rev.score), count(fav.user_id)
	from restaurants res
	inner join reviews rev
		on res.id = rev.restaurant_id
	inner join favorites fav
		on res.id = fav.restaurant_id
where rev.score > ${score}
group by res.name, fav.user_id`)
};

// limitByMinimumReview(2)
//     .then(console.log);
