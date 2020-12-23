const models = require('../models');
var bcrypt = require('bcryptjs');
const token = require('../services/token');

module.exports = {
login: async(req, res, next) => {
    try {
        console.log(req.body.email)
        let user = await models.Usuarios.findOne({ where: { email: req.body.email } });
        if (user) {
            let match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                console.log(user.rol);
                let tokenReturn = await token.encode(user.id, user.rol);
                res.status(200).json({ user, tokenReturn });
            } else {
                res.status(401).send({
                    message: 'Password Incorrecto'
                });
            }
        } else {
            res.status(404).send({
                message: 'No existe el usuario'
            });
        }
    } catch (e) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(e);
    }
},
add: async(req, res, next) =>{
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const reg = await models.Usuarios.create(req.body);
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
},
list: async(req, res, next) => {
    try {
        let valor = req.query.valor;
        const reg = await models.Usuarios.findAll();
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
},
update: async(req, res, next) => {
    try {
        let clave = req.body.password;
        const reg = await models.Usuarios.findOne({where: {email: req.body.email}});
        if ( clave != reg.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const reg2 = await models.Usuarios.update({nombre: req.body.nombre, rol: req.body.rol, email: req.body.email, password: req.body.password}, { where: { id: req.body.id}});
        res.status(200).json(reg2);
    } catch(error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
},
activate: async(req, res, next) => {
    try {
        const reg = await models.Usuarios.update({estado: 1},{where: {id: req.body.id}});
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
},
deactivate: async(req, res, next) => {
    try {
        const reg = await models.Usuarios.update({estado: 0},{where: {id: req.body.id}});
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error)
    }
}
}