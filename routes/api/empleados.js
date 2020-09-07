const router = require('express').Router();
const { getAll, create, getById, remove, update } = require('../../models/empleado');

router.get('/', async(req, res) => {
    console.log(req.user);
    try {
        const empleados = await getAll();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async(req, res) => {
    try {
        req.body.fecha_inic = new Date();
        const result = await create(req.body);
        if (result['affectedRows'] === 1) {
            const nuevoEmpleado = await getById(result['insertId']);
            res.status(201).json({ success: 'Se ha insertado un nuevo empleado', empleado: nuevoEmpleado });
        } else {
            res.status(422).json({ error: 'No se ha podido insertar el empleado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/', async(req, res) => {
    try {
        const result = await remove(req.body.id);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'Se ha borrado el empleado' });
        } else {
            res.status(422).json({ error: 'No se ha borrado el empleado. Comprueba el ID' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/', async(req, res) => {
    try {
        const result = await update(req.body);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'Se ha editado el empleado' });
        } else {
            res.status(422).json({ error: 'No se ha podido actualizar' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;