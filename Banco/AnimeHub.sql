create database animehub;
use animehub;

create table usuario (
    id_usuario int auto_increment primary key,
    nome varchar(100) ,
    email varchar(120) not null unique,
    senha varchar(255)
);


create table anime (
    id_anime int auto_increment primary key,
    titulo varchar(150) not null unique,
    total_episodios int not null default 0,
    duracao_ep_min int not null default 24,
    genero varchar(80),
    ano_lancamento year
);


create table usuario_anime (
    id_usuario int not null,
    id_anime int not null,
    episodios_assistidos int not null default 0,
    episodios_faltam int not null default 0,
    primary key (id_usuario, id_anime),
    constraint fk_ua_usuario
        foreign key (id_usuario) references usuario(id_usuario),
    constraint fk_ua_anime
        foreign key (id_anime) references anime(id_anime)
);

drop table usuario;
drop table anime;
drop table usuario_anime;


SELECT a.titulo, COUNT(ua.id_usuario) AS quantidade
FROM anime a
LEFT JOIN usuario_anime ua ON ua.id_anime = a.id_anime
GROUP BY a.id_anime, a.titulo
ORDER BY quantidade DESC, a.titulo ASC;

 SELECT id_usuario, nome, email FROM usuario WHERE email = 'ricardo@gmail.com' AND senha = 12345;
 
 INSERT INTO usuario (nome, email, senha) VALUES 
 ('Sergio', 'Sergio@gmail.com', '13123');
 
  UPDATE usuario_anime
        SET episodios_assistidos = 20, episodios_faltam = 5
        WHERE id_usuario = 1
        AND id_anime = (SELECT id_anime FROM anime WHERE titulo = 'jujutsu');
			
            
             SELECT ua.id_usuario
        FROM usuario_anime ua
        JOIN anime a ON a.id_anime = ua.id_anime
        WHERE ua.id_usuario = 1 AND a.titulo = 'naruto';
        
         INSERT INTO anime (titulo) VALUES ('tensei shitara no slime');
         
          INSERT INTO usuario_anime (id_usuario, id_anime)
        SELECT 2, id_anime FROM anime WHERE titulo = 'jujutsu';
        
         SELECT
            a.titulo,
            COUNT(ua.id_usuario) AS quantidade
        FROM anime a
        LEFT JOIN usuario_anime ua ON ua.id_anime = a.id_anime
        GROUP BY a.id_anime, a.titulo
        ORDER BY quantidade DESC, a.titulo ASC;
        
         SELECT id_anime, titulo FROM anime WHERE titulo = 'naruto';
         
            SELECT
            a.titulo,
            ua.episodios_assistidos,
            ua.episodios_faltam
        FROM usuario_anime ua
        JOIN anime a ON a.id_anime = ua.id_anime
        WHERE ua.id_usuario =2
        ORDER BY a.titulo ASC;
        
         SELECT id_usuario, nome
        FROM usuario
        WHERE id_usuario IN (
            SELECT id_usuario FROM usuario_anime
            WHERE id_anime = (SELECT id_anime FROM anime WHERE titulo = 'dragon ball')
        )
        ORDER BY nome ASC;
        
select * from usuario;
select * from anime;
select * from usuario_anime;