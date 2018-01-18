class OrderDAO {
    constructor(connection) {
        this._connection = connection;
        this.sql = ""
    }
    listar(callback) {
        this._connection.query('SELECT cp.id_company, cp.company_name, cp.company_cnpj, COUNT(od.id_order) as numberOrder FROM companies AS cp JOIN orders AS od ON cp.id_company = od.fk_id_company GROUP BY cp.id_company', callback);
    }
    salvar(order, callback) {
        this.sql = "INSERT INTO orders(`fk_id_company`) VALUES(" + order.id_company +"); INSERT INTO products_to_order (`fk_id_order`, `fd_id_product`, `quant_product`) VALUES ";
        for (let i = 0; i < order.produtos.length; i++){
            console.log("oiii ?")
            this.sql = this.sql + "((SELECT LAST_INSERT_ID())," + order.produtos[i].id_product + ", " + order.produtos[i].quant_product+"),"
        }
        console.log(this.sql);
        this._connection.query(this.sql, [order.id_company], callback);
    
    }
}

module.exports = function () {
    return OrderDAO;
}