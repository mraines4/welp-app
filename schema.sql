
create table users (
    id serial primary key,
    first_name varchar(100), -- varchar is equivalent to 'character varying'
    last_name varchar(100), -- varying means wont have spaces
    email varchar(200),
    password varchar(500) -- needs to be encrypted, and store hashes not passwords
);

create table restaurants (
    id serial primary key,
    name varchar(200),
    address varchar(200),
    street varchar(200),
    city varchar(100),
    state varchar(50),
    phone varchar(20),
    menu varchar(200),
    picture varchar(500) -- never try to store images in your database, instead store url
);

create table reviews (
    id serial primary key,
    score integer,
    content text,
    -- a single review belongs to a single restaurant
    restaurant_id integer references restaurants(id),
    user_id integer references users(id)
);

-- this is a "linking table" withc describes the following relationships:
-- users can have many restaurants
-- restaurants can have may favorites (can be favorited by many)
-- users have many restaurants through favorites
-- restaurants have many useres through favorites
create table favorites (
    id serial primary key, -- this is optional
    user_id integer references users(id), -- this is a foreign key to users
    restaurant_id integer references restaurants(id) -- FK to restaurants

);