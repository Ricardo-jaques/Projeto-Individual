create database animeHub;
use animeHub;


create table usuario (
    id int primary key auto_increment,
    nome varchar(45),
    email varchar(45) unique,
    senha varchar(45)
);


create table nivel_usuario (
    id int primary key auto_increment,
    nivel varchar(30),
    minutos_acumulados int default 0,
    fk_usuario int unique,
    constraint fkUsuarioNivel foreign key (fk_usuario) references usuario(id)
);


create table anime (
    id int primary key auto_increment,
    nome varchar(45),
    episodios_assistidos int,
    faltam int,
    porcentagem int,
    fk_usuario int,
    constraint fkUsuarioAnime foreign key (fk_usuario) references usuario(id)
);

select * from usuario;
select * from anime;