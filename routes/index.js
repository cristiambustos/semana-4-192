const routerx = require('express-promise-router');
const articuloRouter = require('./articulo.js');
const categoriaRouter = require('./categoria.js');
const usuarioRouter = require('./usuario.js');



const router = routerx();

router.use('/articulo', articuloRouter);
router.use('/categoria', categoriaRouter);
router.use('/usuario', usuarioRouter);

module.exports = router;