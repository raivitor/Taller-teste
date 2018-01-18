class CompanyDAO {
    constructor(connection) {
        this._connection = connection;
    }
    listar(callback) {
        this._connection.query('SELECT cp.id_company, cp.company_name, cp.company_cnpj, COUNT(od.id_order) as numberOrder FROM companies AS cp JOIN orders AS od ON cp.id_company = od.fk_id_company GROUP BY cp.id_company', callback);
    }
    salvar(company, callback) {
        this._connection.query('INSERT INTO companies SET ?', company, callback);
    }
}

module.exports = function () {
    return CompanyDAO;
}


