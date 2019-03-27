const db = require('./conn');

class Review {
    constructor(id, score, content, restaurant_id, user_id) {
        this.id = id;
        this.score = score;
        this.content = content;
        this.restaurantId = restaurant_id;
        this.userId = user_id;
    };

    static getAll() {
        return db.any(`select * from reviews`)
            .catch(() => {
                return null;
            })
    }

    static getById(id) {
        return db.one(`select * from reviews where id=${id}`)
            .then((revData) => {
                return new Review (revData.id, revData.score, revData.content, revData.restaurant_id, revData.user_id);
            })
            .catch(() => {
                return null;
            });
    }

    save(id) {
        return db.result(`
        update reviews set
            score='${this.score}',
            content='${this.content}',
            restaurant_id=${this.restaurantId},
            user_id=${this.userId}
        where id=${this.id}
        `);
    }

};

module.exports = Review;