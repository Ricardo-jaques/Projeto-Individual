var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        // CORRIGIDO: a coluna do banco se chama id_usuario (antes estava .id e vinha undefined)
                        res.json({
                            id: resultadoAutenticar[0].id_usuario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nivel = req.body.nivelServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }  else {


        usuarioModel.cadastrar(nome, email, senha,nivel)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


// Atualiza o progresso (assistidos / faltam) de um anime que o usuário logado JÁ adicionou
function cadastrarAnime(req, res) {
    var idUsuario = req.body.idUsuarioVar;
    var nomeAnime = req.body.nomeAnimeVar;
    var assistidos = req.body.assistidosVar;
    var faltam = req.body.faltamVar;

    // Faça as validações dos valores
    if (idUsuario == undefined) {
        res.status(400).send("Seu id de usuário está undefined!");
    } else if (nomeAnime == undefined) {
        res.status(400).send("Seu nome De anime está undefined!");
    } else if (assistidos == undefined) {
        res.status(400).send("Seu assistidos está undefined!");
    } else if (faltam == undefined) {
        res.status(400).send("Seu faltam está undefined!");
    } else {

        // 1º confere se ESTE usuário já adicionou esse anime
        usuarioModel.buscarVinculo(idUsuario, nomeAnime)
            .then(function (resultadoVinculo) {
                if (resultadoVinculo.length == 0) {
                    res.status(404).send("Você ainda não adicionou esse anime!");
                } else {
                    // 2º já adicionou: atualiza o progresso dele
                    usuarioModel.cadastrarAnime(idUsuario, nomeAnime, assistidos, faltam)
                        .then(function (resultado) {
                            res.json(resultado);
                        })
                        .catch(function (erro) {
                            console.log(erro);
                            console.log(
                                "\nHouve um erro ao salvar o progresso! Erro: ",
                                erro.sqlMessage
                            );
                            res.status(500).json(erro.sqlMessage);
                        });
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar o anime! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

// Adiciona um anime para o usuário logado.
// - Cada usuário só pode adicionar o MESMO anime 1 vez.
// - Usuários diferentes podem adicionar o mesmo anime (cada um soma +1 na dashboard).
function adicionar(req, res) {
    var idUsuario = req.body.idUsuarioVar;
    var nomeAnimeadd = req.body.nomeAnimeaddVar;

    if (idUsuario == undefined) {
        res.status(400).send("Seu id de usuário está undefined!");
    } else if (nomeAnimeadd == undefined) {
        res.status(400).send("Seu nome De anime está undefined!");
    } else {

        // função pequena que liga o usuário ao anime (soma +1 na dashboard)
        function ligar() {
            usuarioModel.vincularUsuario(idUsuario, nomeAnimeadd)
                .then(function (resultadoVinculo) {
                    res.json(resultadoVinculo);
                })
                .catch(function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                });
        }

        // 1º este usuário já adicionou esse anime?
        usuarioModel.buscarVinculo(idUsuario, nomeAnimeadd)
            .then(function (resultadoVinculo) {
                if (resultadoVinculo.length > 0) {
                    res.status(409).send("Você já adicionou esse anime!");
                } else {
                    // 2º o anime já existe na tabela anime (outra pessoa já adicionou)?
                    usuarioModel.buscarAnimePorTitulo(nomeAnimeadd)
                        .then(function (resultadoBusca) {
                            if (resultadoBusca.length > 0) {
                                // já existe: só liga o usuário a ele
                                ligar();
                            } else {
                                // não existe: cria o anime e depois liga o usuário
                                usuarioModel.adicionar(nomeAnimeadd)
                                    .then(function (resultado) {
                                        ligar();
                                    })
                                    .catch(function (erro) {
                                        console.log(erro);
                                        console.log(
                                            "\nHouve um erro ao realizar o cadastro! Erro: ",
                                            erro.sqlMessage
                                        );
                                        res.status(500).json(erro.sqlMessage);
                                    });
                            }
                        })
                        .catch(function (erro) {
                            console.log(erro);
                            res.status(500).json(erro.sqlMessage);
                        });
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao verificar anime duplicado! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function contarAnimes(req, res) {
    usuarioModel.contarAnimes()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao contar os animes! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function meusAnimes(req, res) {
    var idUsuario = req.params.idUsuario;

    usuarioModel.meusAnimes(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar seus animes! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function usuariosDoAnime(req, res) {
    var titulo = req.params.titulo;

    usuarioModel.usuariosDoAnime(titulo)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar os usuários do anime! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarAnime,
    adicionar,
    contarAnimes,
    meusAnimes,
    usuariosDoAnime,
}