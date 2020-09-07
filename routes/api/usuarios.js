const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const { create, getByEmail } = require('../../models/usuario');

router.post('/registro', [
    check('username', 'El campo username es obligatorio').exists().notEmpty(),
    check('email', 'El campo email es obligatorio').exists().isEmail(),
    check('password', 'El campo password es obligatorio').notEmpty(),
], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(errors.array());
    }

    // encriptamos la password
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    await create(req.body);
    res.json({ success: 'Usuario creado correctamente' });
});

router.post('/login', [
    check('email', 'El email es obligatorio').exists().notEmpty(),
    check('password', 'El campo password es obligatorio').exists().notEmpty()
], async(req, res) => {
    // Validación errores datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json(errors.array());

    const usuario = await getByEmail(req.body.email);

    if (usuario) {
        // El email existe en la BD
        const iguales = bcrypt.compareSync(req.body.password, usuario.password);
        if (iguales) {
            res.json({ success: 'login!', token: createToken(usuario) });
        } else {
            res.json({ error: 'El email/password son incorrectos' });
        }
    } else {
        // El email no existe en la BD
        res.json({ error: 'El email/password son incorrectos 1' });
    }
});

// HELPERS
const createToken = (pUser) => {
    const payload = {
        userId: pUser.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(15, 'minutes').unix()
    }
    return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = router;