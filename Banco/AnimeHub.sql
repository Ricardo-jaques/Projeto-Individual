create table animeHub;
use animeHub;

create table usuario(
id int primary key auto_increment,
nome varchar(45),
email varchar(45) unique,
senha varchar(45)
)