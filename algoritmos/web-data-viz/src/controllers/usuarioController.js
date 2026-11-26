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
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); 

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

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
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nivel = req.body.nivelServer;

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


function cadastrarAnime(req, res) {
    var idUsuario = req.body.idUsuarioVar;
    var nomeAnime = req.body.nomeAnimeVar;
    var assistidos = req.body.assistidosVar;
    var faltam = req.body.faltamVar;

    if (idUsuario == undefined) {
        res.status(400).send("Seu id de usuário está undefined!");
    } else if (nomeAnime == undefined) {
        res.status(400).send("Seu nome De anime está undefined!");
    } else if (assistidos == undefined) {
        res.status(400).send("Seu assistidos está undefined!");
    } else if (faltam == undefined) {
        res.status(400).send("Seu faltam está undefined!");
    } else {

        usuarioModel.buscarVinculo(idUsuario, nomeAnime)
            .then(function (resultadoVinculo) {
                if (resultadoVinculo.length == 0) {
                    res.status(404).send("Você ainda não adicionou esse anime!");
                } else {
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

function adicionar(req, res) {
    var idUsuario = req.body.idUsuarioVar;
    var nomeAnimeadd = req.body.nomeAnimeaddVar;

    if (idUsuario == undefined) {
        res.status(400).send("Seu id de usuário está undefined!");
    } else if (nomeAnimeadd == undefined) {
        res.status(400).send("Seu nome De anime está undefined!");
    } else {

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

        usuarioModel.buscarVinculo(idUsuario, nomeAnimeadd)
            .then(function (resultadoVinculo) {
                if (resultadoVinculo.length > 0) {
                    res.status(409).send("Você já adicionou esse anime!");
                } else {
                    usuarioModel.buscarAnimePorTitulo(nomeAnimeadd)
                        .then(function (resultadoBusca) {
                            if (resultadoBusca.length > 0) {
                                ligar();
                            } else {
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