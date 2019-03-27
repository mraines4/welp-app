const db = require('./conn');

class Restaurant {
    constructor(id, name, address, street, city, state, phone, menu, picture) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.street = street;
        this.city = city;
        this.state = state;
        this.phone = phone;
        this.menu = menu;
        this.picture = picture;
    };

    static getAll() {
        return db.any(`select * from restaurants`)
            .catch(() => {
                return null;
            })
    }

    static getById(id) {
        return db.one(`select * from restaurants where id=${id}`)
            .then((restData) => {
                const restInstance = new Restaurant (restData.id, restData.name, restData.address, restData.street, restData.city, restData.state, restData.phone, restData.menu, restData.picture);
                return restInstance;
            })
            .catch(() => {
                return null;
            });
    }

    save(id) {
        return db.result(`
        update restaurants set
            name='${this.name}',
            address='${this.address}',
            street='${this.street}',
            city='${this.city}',
            state='${this.state}',
            phone='${this.phone}',
            menu='${this.menu}',
            picture='${this.picture}'
        where id=${this.id}
        `);
    }

    static favoritesById(id) {
        return db.one(`
        select res.name, count(fav.user_id)
            from restaurants res
            inner join favorites fav
                on res.id = fav.restaurant_id
        where res.id = ${id}
        group by res.name
        `)
    }

    static averageReviewById(id) {
        return db.one(`select res.name, avg(rev.score) as Average
        from restaurants res
        inner join reviews rev
            on res.id = rev.restaurant_id
    where res.id = ${id}
    group by res.name`);
    }

    static allReviewsById(id) {
        return db.any(`select res.name, rev.content, rev.score, usr.first_name ||' '|| usr.last_name as Reviewer
        from restaurants res
        inner join reviews rev
            on res.id = rev.restaurant_id
        inner join users usr
            on usr.id = rev.user_id
    where res.id = ${id}`);
    }
};

module.exports = Restaurant;