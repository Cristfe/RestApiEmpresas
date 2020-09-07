const router = require('express').Router();
const { getAll, getById } = require('../../models/departamento');

router.get('/', async(req, res) => {
    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:departamentoId', async(req, res) => {
    try {
        const row = await getById(req.params.departamentoId);
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'No existe departamento para ese ID' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, file: error.fileName, line: error.lineNumber });
    }
});

module.exports = router;