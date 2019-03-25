-- user profile
-- 1. get all info for a user by id
    -- 1a. get only a few fields for public version
select first_name as Name
	from users
where id =1
;
    -- 1b. get all fields for private version
select *
	from users
where id =1
;
-- 2. get all favorites for a user by id
select usr.first_name ||' '|| usr.last_name as Reviewer, res.name as Favorites
	from users usr
	inner join favorites fav
		on usr.id = fav.user_id
	inner join restaurants res
		on fav.restaurant_id = res.id
where usr.id = 1
;
-- 3. get all reviews by that user by id
select usr.first_name ||' '|| usr.last_name as Reviewer, res.name as Restaurant, rev.content, rev.score
	from users usr
	inner join reviews rev
		on rev.user_id = usr.id
	inner join restaurants res
		on res.id = rev.restaurant_id
where usr.id = 1
;


-- restaurant profile
-- 1. get all info for a restaurant by id
select *
	from restaurants
where id = 1
;
-- 2. get all reviews for restaurant by id
select res.name, rev.content, rev.score, usr.first_name ||' '|| usr.last_name as Reviewer
	from restaurants res
	inner join reviews rev
		on res.id = rev.restaurant_id
	inner join users usr
		on usr.id = rev.user_id
where res.id = 2
;
-- 3. get average review for a restaurant by id
select res.name, avg(rev.score) as Average
	from restaurants res
	inner join reviews rev
		on res.id = rev.restaurant_id
where res.id = 2
group by res.name
;
-- 4. get count of favorites for restaurant by id
select res.name, count(fav.user_id)
	from restaurants res
	inner join favorites fav
		on res.id = fav.restaurant_id
where res.id = 2
group by res.name
;

-- restaurant search result (restaurants in Atlanta, GA)
-- 1a. get all matching rows for restaurant by name (case insensitive search)
    -- 1b. include average review
    -- 1c. include number of favorites
select distinct res.name, avg(rev.score), count(fav.user_id)
	from restaurants res
	inner join reviews rev
		on res.id = rev.restaurant_id
	inner join favorites fav
		on res.id = fav.restaurant_id
where res.name ilike 'applebees'
group by res.name, fav.user_id
;
-- 2. limit by minimum review
select distinct res.name, avg(rev.score), count(fav.user_id)
	from restaurants res
	inner join reviews rev
		on res.id = rev.restaurant_id
	inner join favorites fav
		on res.id = fav.restaurant_id
where rev.score > 3
group by res.name, fav.user_id
;
-- 3. (super bonus) pagination



