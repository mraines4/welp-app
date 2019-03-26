// const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const User = require('../models/user');
const Restaurant = require('../models/restaurants');
const Favorite = require('../models/favorites');
const Review = require('../models/reviews');


// describe('Sanity check', function() {
//     it('should be 2', function() {
//         // assert.equal(2, 1+1);
//         expect(1+1).to.equal(2);
//     });
// });

describe('Restauraunt model', () => {
    it('should be able to grab an array of restaurants', async () => {
        const arrayOfRestaurants = await Restaurant.getAll();
        expect(arrayOfRestaurants).to.be.instanceOf(Array);
    });

    it('should be able to retrieve by id', async () => {
        const theRestaurant = await Restaurant.getById(2);
        expect(theRestaurant).to.be.instanceOf(Restaurant);
    });

    it('should update the restaurant', async () => {
        const theRestaurant = await Restaurant.getById(2);
        theRestaurant.name = "Chuck E. Cheese";
        await theRestaurant.save()
        const alsoTheRest = await Restaurant.getById(2);
        expect(alsoTheRest.name).to.be.equal('Chuck E. Cheese');
    });


});

describe('Review model', () => {
    it('should be able to grab an array of reviews', async () => {
        const arrayOfReviews = await Review.getAll();
        expect(arrayOfReviews).to.be.instanceOf(Array);
    });

    it('should be able to retrieve by id', async () => {
        const theReview = await Review.getById(2);
        expect(theReview).to.be.instanceOf(Review);
    });

    it('should update the review', async () => {
        const theReview = await Review.getById(2);
        theReview.content = "tis crap";
        await theReview.save();
        const alsoTheReview = await Review.getById(2);
        expect(alsoTheReview.content).to.be.equal('tis crap');
    });


});

describe('Favorite model', () => {
    it('should be able to grab an array of favorites', async () => {
        const arrayOfFavorites = await Favorite.getAll();
        expect(arrayOfFavorites).to.be.instanceOf(Array);
    });

    it('should be able to retrieve by id', async () => {
        const theFavorite = await Favorite.getById(2);
        expect(theFavorite).to.be.instanceOf(Favorite);
    });

    it('should update the favorite', async () => {
        const theFavorite = await Favorite.getById(2);
        theFavorite.userId = 1;
        await theFavorite.save();
        const alsoTheFavorite = await Favorite.getById(2);
        expect(alsoTheFavorite.userId).to.be.equal(1);
    });


});

describe('Users model', () => {
    // 😄
    it('should be able to retrieve by id', async () => {
        const theUser = await User.getById(3);
        theUser.should.be.an.instanceOf(User);
        // theUser.should.have.length(1);
    });
    // 😭
    it('should error if no user by id', async () => {
        const theUser = await User.getById(55);
        expect(theUser).to.be.null;
        // theUser.should.be.an.instanceOf(User);
        // theUser.should.have.length(1);
    });

    it('should update the user', async() => {
        // grab a user with id 2
        const theUser = await User.getById(2);
        // update the email
        theUser.email = 'new@new.com';
        // save the user
        await theUser.save()
        const alsoTheUser = await User.getById(2);
        // expect the eamil to be equal to the new value
        expect(alsoTheUser.email).to.equal('new@new.com');
    });
});