class CompanyDAO {
    constructor(connection) {
        this._connection = connection;
    }
    listar(callback) {
        this._connection.query('SELECT c.id_company, c.company_name, c.company_cnpj, count(o.id_order) as numberOrder FROM `companies` as c left join orders as o on c.id_company = o.fk_id_company GROUP by c.id_company, c.company_name, c.company_cnpj', callback);
    }
    salvar(company, callback) {
        this._connection.query('INSERT INTO companies SET ?', company, callback);
    }
}

module.exports = function () {
    return CompanyDAO;
}