const models = require('../models');

module.exports = {
    add: async(req, res, next) => {
        try {
            const reg = await models.Categorias.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
            message: 'Ocurrió un error'});
            next(error);
        }
    },
    list: async(req, res, next) => {
        try {
            const reg = await models.Categorias.findAll();
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    update: async(req, res, next) => {
        try {

            const reg = await models.Categorias.update({ nombre: req.body.nombre, descripcion: req.body.descripcion }, { where: { id: req.body.id } });
            res.status(200).json(reg);
        } catch (e) {
             res.status(500).send({
                 message: 'Ocurrió un error'
             });
            next(e);
        }
    },
    activate: async(req, res, next) => {
        try {
            const reg = await models.Categorias.update({ estado: 1}, { where: { id: req.body.id}});
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
            const reg = await models.Categorias.update({ estado: 0}, {where: { id: req.body.id}});
            res.status(200).json(reg);
        } catch (error) {
             res.status(500).send({
                 message: 'Ocurrió un error'
             });
            next(error);
        }
    }
}