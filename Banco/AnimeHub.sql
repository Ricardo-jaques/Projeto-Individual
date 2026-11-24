create database animehub;
use animehub;



create table usuario (
    id_usuario int auto_increment primary key,
    nome varchar(100) ,
    email varchar(120) not null unique,
    senha varchar(255) ,
    constraint fk_usuario_nivel
        foreign key (id_nivel) references nivel(id_nivel)
);

create table anime (
    id_anime int auto_increment primary key,
    titulo varchar(150) not null,
    total_episodios int not null default 0,
    duracao_ep_min int not null default 24,
    genero varchar(80),
    ano_lancamento year
);

create table usuario_anime (
    id_usuario int not null,
    id_anime int not null,
    episodios_assistidos int not null default 0,
   status_anime varchar(20) not null default 'planejado',
    atualizado_em timestamp default current_timestamp,
    primary key (id_usuario, id_anime),
    constraint fk_ua_usuario
        foreign key (id_usuario) references usuario(id_usuario),
    constraint fk_ua_anime
        foreign key (id_anime) references anime(id_anime)
);


