const router = require('express').Router();

const apiEmpleadosRouter = require('./api/empleados');
const apiDepartamentosRouter = require('./api/departamentos');
const apiUsuariosRouter = require('./api/usuarios');

const { checkToken } = require('./middlewares');

router.use('/empleados', checkToken, apiEmpleadosRouter);
router.use('/departamentos', checkToken, apiDepartamentosRouter);
router.use('/usuarios', apiUsuariosRouter);

module.exports = router;