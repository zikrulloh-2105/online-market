alter table users
add user_is_admin boolean default false;

alter table users
drop user_address;

alter table products
add product_img text;