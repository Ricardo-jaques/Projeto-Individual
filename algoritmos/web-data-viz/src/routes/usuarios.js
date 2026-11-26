var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

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

router.get("/meusAnimes/:idUsuario", function (req, res) {
    usuarioController.meusAnimes(req, res);
});

router.get("/usuariosDoAnime/:titulo", function (req, res) {
    usuarioController.usuariosDoAnime(req, res);
});

module.exports = router;