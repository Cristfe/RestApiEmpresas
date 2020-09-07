const router = require('express').Router();
const moment = require('moment');

const { getAll, create, getById, update, remove } = require('../models/empleado');


router.get('/', async(req, res) => {
    try {
        const rows = await getAll();
        rows.forEach(row => {
            row.fecha_inc = moment(row.fecha_inc).format('DD-MM-YYYY');
        })
        res.render('empleados/index', {
            empleados: rows
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/new', (req, res) => {
    res.render('empleados/formulario');
});


router.get('/:departamentoId', async(req, res) => {
    try {
        const empleado = await getById(req.params.departamentoId);
        res.render('empleados/detail', { empleado });
    } catch (error) {
        console.log(error);
    }
});

router.post('/create', async(req, res) => {

    req.body.fecha_inc = new Date();
    const result = await create(req.body);

    res.redirect('/empleados');
});


router.get('/edit/:empleadoId', async(req, res) => {
    const empleado = await getById(req.params.empleadoId);
    res.render('empleados/update', { empleado });
});

router.post('/update', async(req, res) => {
    const result = await update(req.body);
    console.log(result);
    res.redirect(`/empleados/${req.body.id}`);
});

router.get('/delete/:empleadoId', (req, res) => {
    remove(req.params.empleadoId)
        .then(result => {
            res.redirect('/empleados');
        }).catch(error => console.log(error));
});

module.exports = router;