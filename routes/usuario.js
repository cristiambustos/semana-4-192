const routerx = require('express-promise-router');
const { list } = require('../controllers/CategoriaController.js');
const usuarioController = require('../controllers/UsuarioController.js');
const auth = require('../middlewares/auth');

const router = routerx();

router.post('/login', usuarioController.login);
router.get('/list', auth.verifyUsuario, usuarioController.list);
router.post('/add', auth.verifyUsuario, usuarioController.add);
router.put('/update', auth.verifyUsuario, usuarioController.update);
router.put('/activate', auth.verifyUsuario, usuarioController.activate);
router.put('/deactivate', auth.verifyUsuario, usuarioController.deactivate);

module.exports = router;