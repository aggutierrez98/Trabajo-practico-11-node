const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { getUsuarios, postUsuario, putUsuario, deleteUsuario, getUsuarioPost, putUsuarioGet } = require('../controllers/usuarios');
const { existeUsuarioPorId, emailExiste } = require("../helpers/db-validators");

const router = Router();

router.get("/", getUsuarios);

router.get("/add", getUsuarioPost);

router.post("/add", [
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(emailExiste),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    validarCampos
], postUsuario);

router.get("/edit/:id", [
    check("id").custom(existeUsuarioPorId),
    validarCampos
], putUsuarioGet);

router.post("/edit/:id", [
    check("id").custom(existeUsuarioPorId),
    validarCampos
], putUsuario);

router.get("/delete/:id", [
    check("id").custom(existeUsuarioPorId),
    validarCampos
], deleteUsuario);

module.exports = router;