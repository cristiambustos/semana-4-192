var jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../secret/config');

    module.exports = {
        //generar el token
        encode: async(id, rol) => {
        const token = jwt.sign({ id: id, rol: rol }, config.secret, { expiresIn: 86400 });
        return token;
        },
        //permite decodificar el token
        decode: async(token) => {
        try {
        const { id } = await jwt.verify(token, config.secret);
        const user = await models.Usuarios.findOne({ where: { id, estado: 1 } });
        if (user) {
        return user;
        } else {
        return false;
        }
        } catch (e) {
        const newToken = await checkToken(token);
        return newToken;
        }
        }
    }