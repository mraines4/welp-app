const db = require('./conn');

db.any('select * from users where id =1;')
    .then(function(data) {
        // success;
        console.log(data);
    })
    .catch(function(error) {
        // error;
    });