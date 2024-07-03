Create Database ql_ban_hang;
use ql_ban_hang;

Create Table category(
    id int primary key auto_increment,
    name varchar(100) not null unique,
    status tinyint default 1
);

Create Table product(
    id int primary key auto_increment,
    name varchar(150) not null unique,
    price float not null,
    sale_price float default 0,
    image varchar(200) null,
    category_id int not null,
    status tinyint default 1,
    foreign key (category_id) references category(id)
);

INSERT INTO category(name, status) VALUES
('Phụ kiện', 1)
('Đồng hồ', 1)
('Máy lạnh', 1)
('Máy giặt', 1)
('Tủ lạnh', 1)
('Tivi', 1)



INSERT INTO category SET name = 'xe tăng', status = 1;