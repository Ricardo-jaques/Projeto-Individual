create database animehub;
use animehub;

create table nivel (
    id_nivel int auto_increment primary key,
    nome varchar(50) not null,
    xp_minimo int not null default 0,
    descricao varchar(150)
);

create table usuario (
    id_usuario int auto_increment primary key,
    nome varchar(100) ,
    email varchar(120) not null unique,
    senha varchar(255) ,
    id_nivel int default 1,
    xp_atual int not null default 0,
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
    nota decimal(3,1) null,
    atualizado_em timestamp default current_timestamp,
    primary key (id_usuario, id_anime),
    constraint fk_ua_usuario
        foreign key (id_usuario) references usuario(id_usuario),
    constraint fk_ua_anime
        foreign key (id_anime) references anime(id_anime)
);

insert into nivel(nome,xp_minimo,descricao) values
('genin','0','voce assistiu poucos animes para subir assista mais animes')
('chunin','10','voce ainda esta no começo completou no minimo 10 animes')
('jonin','20','parabens voce esta ficando craque em assistir animes ja asistiu no minimo 20')
('kage','30','voce chegou num nivel incrivel ja pode comandar uma vila de ninjas assistiu no minimo 30 animes')
('akatsuki','50','agora voce pode fundar seu proprio clube escondido que ninguem sabera parabens por assistir 50 animes')
