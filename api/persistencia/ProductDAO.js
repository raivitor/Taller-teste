class ProductDAO {
    constructor(connection) {
        this._connection = connection;
    }
    listar(callback) {
        this._connection.query('SELECT * FROM products', callback);
    }
}

module.exports = function () {
    return ProductDAO;
}