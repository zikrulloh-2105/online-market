create extension if not exists "uuid-ossp";

drop table if exists users cascade;
create table users (
        user_id uuid DEFAULT uuid_generate_v4 () primary key,
        user_first_name text check (length (user_first_name) >= 3 and length (user_first_name) <= 20) not null,
        user_last_name text check (length (user_last_name) >= 3 and length (user_last_name) <= 23) not null,
        user_age smallint check (user_age >= 0 AND user_age <= 120) not null,
        user_phone_number varchar(13) not null,
        user_password text check (length (user_password) >= 8 and length (user_password) <= 16) not null,
        user_is_admin boolean default false,
        user_created_at timestamp with time zone default current_timestamp
);

drop table if exists products cascade;
create table products (
        product_id uuid DEFAULT uuid_generate_v4 () primary key,
        product_name text check (length (product_name) >= 2 and length (product_name) <= 50) not null,
        product_quantity smallint not null,
        product_price text not null,
        product_img text,
        user_id uuid references users (user_id),
        product_created_at timestamp with time zone default current_timestamp
);

drop table if exists orders cascade;
create table orders (
        order_id uuid DEFAULT uuid_generate_v4 () primary key,
        user_id uuid not null references users (user_id),
        order_created_at timestamp with time zone default current_timestamp
);

drop table if exists order_products cascade;

create table order_products (
        op_id uuid DEFAULT uuid_generate_v4 () primary key,
        product_id uuid not null references products (product_id),
        order_id uuid not null references orders (order_id)
);