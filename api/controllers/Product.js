module.exports = function (app) {
    app.get('/product', function (req, res) {
        var connection = app.persistencia.connectionFactory();
        var productDAO = new app.persistencia.ProductDAO(connection);

        productDAO.listar(function (err, resultados) {
            if (err) {
                console.log('Erro no banco:' + erro);
                res.status(500).send(err);
            }
            res.status(200).send(resultados);
        });
        connection.end();
    });
}