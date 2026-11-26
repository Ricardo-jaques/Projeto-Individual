var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarAnime", function (req, res) {
    usuarioController.cadastrarAnime(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});
router.post("/adicionar", function (req, res) {
    usuarioController.adicionar(req, res);
});
router.get("/contarAnimes", function (req, res) {
    usuarioController.contarAnimes(req, res);
});

// NOVA: devolve os animes (e o progresso) de UM usuário
router.get("/meusAnimes/:idUsuario", function (req, res) {
    usuarioController.meusAnimes(req, res);
});

// NOVA: devolve os usuários que assistem um anime (usada no "Quem assiste o mesmo que eu?")
router.get("/usuariosDoAnime/:titulo", function (req, res) {
    usuarioController.usuariosDoAnime(req, res);
});

module.exports = router;