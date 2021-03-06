// bring in the database connection
const db = require('./conn');
const Review = require('./reviews');
const bcrypt = require('bcryptjs');

// need a User class
// classes should start with upper case letter
class User {

    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.password = password;

        
    }

    static add(userData) {
        // do an insert into the database
        // not using ${} because i dont want to interpolate
        // using ($) so that pg-promise does *safe* interpolation
        return db.one(`insert into users 
            (first_name, last_name, email, password) 
        values
            ($1, $2, $3, $4)
        returning id
            `, [userData.first_name, userData.last_name, userData.email, userData.password])
            .then((data) => {
                console.log('the thing happened')
                console.log(`new user id is ${data.id}`);
                return data.id;
            })
    }

    static delete(id) {
        return db.result('delete from users where id=$1', [id]);
    }

    static getAll() {
        return db.any(`select * from users`)
        .then((arrayOfUsers) => {
            return arrayOfUsers.map((userData) => {
                const aUser = new User(userData.id, userData.first_name, userData.last_name, userData.email, userData.password);
                return aUser;
            })
        })
            .catch(() => {
                return null;
            })
    }
    // "static" means that the funciton is something
    // the class can do, but an instance cannot
    static getById(id) {
        // .any always returns an array
        // instead well use .one
        return db.one(`select * from users where id=${id}`)
                    .then((userData) => {
                        // you must use the new keyword
                        // when you call a JavaScript constructor
                        return new User(userData.id, userData.first_name, userData.last_name, userData.email, userData.password);
                    })
                    .catch(() => {
                        return null; //signal an invalid value
                    })
    }

    
    // no static since this is an instance method
    // it belongs to the individual instance
    save() {
        // use .result when you might want a report
        // about how many rows got affected
        return db.result(`
        update users set
            first_name='${this.firstName}',
            last_name='${this.lastName}',
            email='${this.email}',
            password='${this.password}'
        where id=${this.id}
        `)
    }

    setPassword(newPassword) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        this.password = hash;
    }

    static getByEmail(email) {
        return db.one(`select * from users where email=$1`, [email])
            .then(userData => {
                const aUser = new User(
                    userData.id, 
                    userData.first_name, 
                    userData.last_name, 
                    userData.email, 
                    userData.password);
                return aUser;
            })
    }

    checkPassword(aPassword) {
        return bcrypt.compareSync(aPassword, this.password);
    }

    get reviews() {
        return db.any(`select * from reviews where user_id=${this.id}`)
            .then((arrayOfReviewData) => {
                // equivalent to using .map
                const arrayOfReviewInstances = [];

                arrayOfReviewData.forEach((data) => {
                    const newInstance = new Review(
                        data.id,
                        data.score,
                        data.content,
                        data.restaurant_id,
                        data.user_id
                    );
                    arrayOfReviewInstances.push(newInstance);
                });

                return arrayOfReviewInstances;
            });
    }

}


// User.getById(3)
//     .then((user) => {
//         console.log(user);
//     });

// export my User model
module.exports = User;