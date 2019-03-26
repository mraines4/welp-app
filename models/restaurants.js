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
};

module.exports = Restaurant;