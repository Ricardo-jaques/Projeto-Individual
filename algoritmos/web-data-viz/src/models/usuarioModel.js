var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrar(nome, email, senha,nivel) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    

    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha,id_nivel) VALUES ('${nome}', '${email}', '${senha}','${nivel}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function cadastrarAnime(nomeAnime,assistidos,porcentagem,faltam){
console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAnime():", nomeAnime, assistidos, porcentagem,faltam);
    

    var instrucaoSql = `
        INSERT INTO anime (nome, episodios_assistidos, faltam,porcentagem) VALUES ('${nomeAnime}', '${assistidos}', '${faltam}','${porcentagem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionar(nomeAnimeadd){
console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionar():", nomeAnimeadd);
    

    var instrucaoSql = `
        INSERT INTO anime (titulo) VALUES ('${nomeAnimeadd}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarAnimes() {
    console.log("ACESSEI O USUARIO MODEL \n \n function contarAnimes()");

    var instrucaoSql = `
        SELECT
            titulo,
            COUNT(*) AS quantidade
        FROM anime
        GROUP BY titulo
        ORDER BY quantidade DESC, titulo ASC;
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

module.exports = {
    autenticar,
    cadastrar,
    cadastrarAnime,
    adicionar,
    contarAnimes,
    buscarAnimePorTitulo
};