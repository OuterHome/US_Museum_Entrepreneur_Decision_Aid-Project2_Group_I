create database project_museum;

USE project_museum;

create table museum(
id int primary key,
museum_id integer(10),
museum_name varchar(45),
legal_name varchar(45),
alternate_name varchar(10),
museum_type varchar(30),
street_address varchar(50),
city varchar(25),
state varchar(2),
zip_code integer(5),
latitude decimal(8,6),
longitude decimal(8,6),
income decimal(8,1),
revenue decimal(8,1));

select * from museum;