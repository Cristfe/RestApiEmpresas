const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from departamento', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

const getById = (pSedeId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from departamento where id = ? ', [pDepartamentoId], (err, rows) => {
            if (err) return reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        })
    });
}

module.exports = {
    getAll,
    getById
}