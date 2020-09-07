const dbConfig = require("../dbConfig")

const getAllCb = (callback) => {
    db.query('SELECT * FROM empleados', callback);
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM empleados', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

const getAllV2 = async() => {
    const rows = await executeQuery('select * from empleados where id = ?', [4]);
    return rows;
}

const create = ({ nombre, dni, sexo, fecha_nac, fecha_inic, salario, cargo }) => {
    const valores = [nombre, dni, sexo, fecha_nac, fecha_inic, salario, cargo];

    return new Promise((resolve, reject) => {
        db.query('insert into empleados (nombre, dni, sexo, fecha_nac, fecha_inic, salario, cargo) values (?, ?, ?, ?, ?, ?, ?, ?)', valores, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}


const getById = (pEmpleadoId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from empleados where id = ?', [pEmpleadoId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}

const update = ({ nombre, dni, sexo, fecha_nac, fecha_inic, salario, cargo, id }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE empleados SET nombre = ?, dni = ?, sexo = ?, fecha_nac = ?, fecha_inic = ?, salario = ?, cargo = ? WHERE id = ?', [nombre, dni, sexo, fecha_nac, fecha_inic, salario, cargo, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}


const remove = (pEmpleadoId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from empleados where id = ?', [pEmpleadoId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}


const executeQuery = (query, values = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}

module.exports = {
    getAllCb,
    getAll,
    create,
    getById,
    update,
    remove
}