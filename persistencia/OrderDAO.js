class OrderDAO {
    constructor(connection) {
        this._connection = connection;
    }

    list(id_company, callback) {
        let sql = 'SELECT o.id_order, p.product_name, pto.quant_product FROM `products_to_order` AS pto LEFT JOIN orders AS o ON pto.fk_id_order = o.id_order LEFT JOIN products AS p ON pto.fk_id_product = p.id_product WHERE o.fk_id_company = ?'
        this._connection.query(sql, [id_company], callback);
    }

    saveOrder(id_company, callback) {
        let sql = "INSERT INTO orders(`fk_id_company`) VALUES(?);";
        this._connection.query(sql, [id_company], callback);
    }

    saveProducts(order, id_company, callback) {
        let sql = "";
        for (let i = 0; i < order.produtos.length; i++) {
            sql = sql + "INSERT INTO products_to_order (`fk_id_order`, `fk_id_product`, `quant_product`) VALUES (" + id_company + "," + order.produtos[i].id_product + ", " + order.produtos[i].quant_product + ");";
        }
        this._connection.query(sql, callback);
    }
    delete(order_id, callback) {
        let sql = 'DELETE FROM orders WHERE id_order=?';
        this._connection.query(sql, [order_id], callback);
    }
}

module.exports = function () {
    return OrderDAO;
}