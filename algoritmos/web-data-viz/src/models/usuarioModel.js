var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id_usuario, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrar(nome, email, senha,nivel) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);


    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function cadastrarAnime(idUsuario, nomeAnime, assistidos, faltam){
    console.log("ACESSEI O USUARIO MODEL \n function cadastrarAnime():", idUsuario, nomeAnime, assistidos, faltam);

    var instrucaoSql = `
        UPDATE usuario_anime
        SET episodios_assistidos = ${assistidos}, episodios_faltam = ${faltam}
        WHERE id_usuario = ${idUsuario}
        AND id_anime = (SELECT id_anime FROM anime WHERE titulo = '${nomeAnime}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarVinculo(idUsuario, nomeAnime){
    console.log("ACESSEI O USUARIO MODEL \n function buscarVinculo():", idUsuario, nomeAnime);

    var instrucaoSql = `
        SELECT ua.id_usuario
        FROM usuario_anime ua
        JOIN anime a ON a.id_anime = ua.id_anime
        WHERE ua.id_usuario = ${idUsuario} AND a.titulo = '${nomeAnime}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function adicionar(nomeAnimeadd){
    console.log("ACESSEI O USUARIO MODEL \n function adicionar():", nomeAnimeadd);

    var instrucaoSql = `
        INSERT INTO anime (titulo) VALUES ('${nomeAnimeadd}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Liga o usuário que adicionou ao anime que acabou de ser criado
function vincularUsuario(idUsuario, nomeAnime){
    console.log("ACESSEI O USUARIO MODEL \n function vincularUsuario():", idUsuario, nomeAnime);

    var instrucaoSql = `
        INSERT INTO usuario_anime (id_usuario, id_anime)
        SELECT ${idUsuario}, id_anime FROM anime WHERE titulo = '${nomeAnime}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Ranking: quantas PESSOAS assistem cada anime (maior primeiro)
function contarAnimes() {
    console.log("ACESSEI O USUARIO MODEL \n \n function contarAnimes()");

    var instrucaoSql = `
        SELECT
            a.titulo,
            COUNT(ua.id_usuario) AS quantidade
        FROM anime a
        LEFT JOIN usuario_anime ua ON ua.id_anime = a.id_anime
        GROUP BY a.id_anime, a.titulo
        ORDER BY quantidade DESC, a.titulo ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAnimePorTitulo(titulo) {
    console.log("ACESSEI O USUARIO MODEL \n \n function buscarAnimePorTitulo():", titulo);

    var instrucaoSql = `
        SELECT id_anime, titulo FROM anime WHERE titulo = '${titulo}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Animes + progresso de UM usuário
function meusAnimes(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n function meusAnimes():", idUsuario);

    var instrucaoSql = `
        SELECT
            a.titulo,
            ua.episodios_assistidos,
            ua.episodios_faltam
        FROM usuario_anime ua
        JOIN anime a ON a.id_anime = ua.id_anime
        WHERE ua.id_usuario = ${idUsuario}
        ORDER BY a.titulo ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Usuários que assistem um anime (id e nome)
function usuariosDoAnime(titulo) {
    console.log("ACESSEI O USUARIO MODEL \n function usuariosDoAnime():", titulo);

    var instrucaoSql = `
        SELECT id_usuario, nome
        FROM usuario
        WHERE id_usuario IN (
            SELECT id_usuario FROM usuario_anime
            WHERE id_anime = (SELECT id_anime FROM anime WHERE titulo = '${titulo}')
        )
        ORDER BY nome ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarAnime,
    adicionar,
    vincularUsuario,
    buscarVinculo,
    contarAnimes,
    buscarAnimePorTitulo,
    meusAnimes,
    usuariosDoAnime
};