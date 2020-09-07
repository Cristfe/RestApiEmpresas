const jwt = require('jsonwebtoken');
const moment = require('moment');

const { getById } = require('../models/usuario');

const checkToken = async(req, res, next) => {
    console.log(req.headers);

    // Estructura de la cabecera:
    // Authorization: Bearer TOKEN

    // 1 - Compruebo si la cabecera está presente
    if (!req.headers['authorization']) {
        return res.status(401).json({ error: 'Es necesaria la cabecera de autorización' });
    }

    // 2 - Comprobamos si el tipo es Bearer
    const value = req.headers['authorization'];
    const splitValue = value.split(' ');
    if (splitValue.length !== 2 || splitValue[0] !== 'Bearer') {
        return res.status(401).json({ error: 'El valor de la cabecera no tiene el formato correcto' });
    }

    // 3 - Comprobar si el token es correcto -> el token se puede desencriptar
    const token = splitValue[1];
    let payload = {};
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return res.status(401).json({ error: 'El formato del token es incorrecto' });
    }

    // 4 - Comprobar si el token está caducado
    const fechaActual = moment().unix();
    if (fechaActual > payload.expiredAt) {
        return res.status(401).json({ error: 'El token está caducado' });
    }

    // Recuperamos el USUARIO
    const usuario = await getById(payload.userId);
    req.user = usuario;

    next();
}

// Authorization: Bearer TOKEN
module.exports = { checkToken };