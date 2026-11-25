create database animehub;
use animehub;

create table usuario (
    id_usuario int auto_increment primary key,
    nome varchar(100) ,
    email varchar(120) not null unique,
    senha varchar(255)
);

-- "unique" no titulo: existe só 1 linha por anime na tabela (usuários diferentes dividem essa linha)
create table anime (
    id_anime int auto_increment primary key,
    titulo varchar(150) not null unique,
    total_episodios int not null default 0,
    duracao_ep_min int not null default 24,
    genero varchar(80),
    ano_lancamento year
);

-- Cada linha = 1 pessoa assistindo 1 anime (e o progresso DELA)
-- A chave primária dupla impede a MESMA pessoa de ter o mesmo anime 2 vezes
-- (pessoas diferentes podem ter o mesmo anime: cada uma é uma linha e soma +1 no ranking)
create table usuario_anime (
    id_usuario int not null,
    id_anime int not null,
    episodios_assistidos int not null default 0,
    episodios_faltam int not null default 0,
    status_anime varchar(20) not null default 'planejado',
    atualizado_em timestamp default current_timestamp,
    primary key (id_usuario, id_anime),
    constraint fk_ua_usuario
        foreign key (id_usuario) references usuario(id_usuario),
    constraint fk_ua_anime
        foreign key (id_anime) references anime(id_anime)
);

-- ==========================================================
-- SE VOCÊ JÁ CRIOU AS TABELAS ANTES, NÃO RODE OS CREATE ACIMA.
-- Rode só isto (apaga os animes de teste e ajusta as tabelas):
--
-- delete from usuario_anime;
-- delete from anime;
-- alter table anime add unique (titulo);
-- alter table usuario_anime add column episodios_faltam int not null default 0;
-- ==========================================================

-- Ranking: quantas pessoas assistem cada anime (é o que o gráfico usa)
SELECT a.titulo, COUNT(ua.id_usuario) AS quantidade
FROM anime a
LEFT JOIN usuario_anime ua ON ua.id_anime = a.id_anime
GROUP BY a.id_anime, a.titulo
ORDER BY quantidade DESC, a.titulo ASC;

select * from usuario;
select * from anime;
select * from usuario_anime;