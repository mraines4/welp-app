insert into users
    (first_name, last_name, email, password)
values
    ('Matt', 'Raines', 'myemail@emailplace.com', 'abc123'),
    ('Chelsey', 'Raines', 'heremail@funmail.com', 'password1'),
    ('Trigger', 'Raines', 'dogmail@dogmail.com', 'woofwoof'),
    ('Judah', 'Raines', 'baby@babymail.com', 'googoogaga')
;


insert into restaurants
    (name, address, street, city, state, phone, menu, picture)
values
    ('Chilis', '123 Main Street, Acworth, GA, 30102','123 Main Street', 'Acworth', 'Georgia', '6785551234', 'https://www.chilis.com/menu', 'https://www.nrn.com/sites/nrn.com/files/styles/article_featured_standard/public/22_Chilis_9.jpg?itok=cgSeEjJE'),
    ('AppleBees', '456 South Road, Kennesaw, GA, 30152', '456 South Road', 'Kennesaw', 'Georgia', '4041231234', 'https://www.applebees.com/en/menu/pasta-seafood-and-more', 'https://www.alexslemonade.org/sites/default/files/ab_brand_refresh_logo_cmyk_gray_r.png'),
    ('Ruby Tuesday', '555 5th street, Acworth, GA, 30102', '456 South Road', 'Acworth', 'Georgia', '4705552424', 'https://www.rubytuesday.com/menu', 'https://www.nrn.com/sites/nrn.com/files/styles/article_featured_standard/public/uploads/2016/11/ruby-tuesday-exterior-promo.png?itok=kWp2hs8F'),
    ('Golden Corral', '434 Happy Lane, Kennesaw, GA, 30144', '434 Happy Lane', 'Kennesaw', 'Georgia', '7709994444', 'https://togo.goldencorral.com/menu', 'https://www.sistersonthefly.com/wp-content/uploads/2019/01/golden-corral-prices.jpg')
;

insert into reviews
    (score, content, restaurant_id, user_id)
values
    (5, 'Man i love Chilis, best beer in town!', 1, 1),
    (3, 'Theres no milk!, but atmosphere was okay I guess...', 3, 4),
    (1, 'Yeah I got kicked out for eating straign from the buffet', 4, 3),
    (2, 'No apples, no bees... Pass.', 2, 2)
;

insert into favorites
    (user_id, restaurant_id)
values
    (2, 1),
    (3, 3),
    (4, 2),
    (1, 1)
;