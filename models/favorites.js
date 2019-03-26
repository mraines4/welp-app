const db = require('./conn');

class Favorite {
    constructor(id, user_id, restaurant_id) {
        this.id = id;
        this.userId = user_id;
        this.restaurantId = restaurant_id;
    };

    static getAll() {
        return db.any(`select * from favorites`)
            .catch(() => {
                return null;
            })
    }

    static getById(id) {
        return db.one(`select * from favorites where id=${id}`)
            .then((favData) => {
                const favInstance = new Favorite (favData.id, favData.user_id, favData.restaurant_id);
                return favInstance;
            })
            .catch(() => {
                return null;
            });
    }

    save(id) {
        return db.result(`
        update favorites set
            user_id=${this.userId},
            restaurant_id=${this.restaurantId}
        where id=${this.id}
        `);
    }
};

module.exports = Favorite;