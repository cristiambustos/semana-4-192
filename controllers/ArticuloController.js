const models = require('../models');
const Categorias = require('../models').Categorias;

module.exports = {
    add: async(req, res, next) => {
        try {
            const reg = await models.Articulos.create(req.body);
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
            const reg = await models.Articulos.findAll({
                include: [
                    {
                        model: Categorias, as: 'Categorias'
                    }
                ]
            });
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

            const reg = await models.Articulos.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                codigo: req.body.codigo,
                CategoriaId: req.body.CategoriaId}, { where: { id: req.body.id } });
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
            const reg = await models.Articulos.update({ estado: 1}, { where: { id: req.body.id}});
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
            const reg = await models.Articulos.update({ estado: 0}, {where: { id: req.body.id}});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    }
}