module.exports = function (app) {
    app.post('/order', function (req, res) {
        var produto = req.body;

        var connection = app.persistencia.connectionFactory();
        var orderDAO = new app.persistencia.OrderDAO(connection);

        orderDAO.salvar(produto, function (err, results) {
            if (err) {
                console.log('Erro ao inserir no banco:' + err);
                res.status(500).send(err);
            }
            else {
                console.log('Order criada');
                res.status(201).json(results);
            }
        });
        connection.end();
    });

    app.get('/order/:id', function (req, res) {
        var connection = app.persistencia.connectionFactory();
        var orderDAO = new app.persistencia.OrderDAO(connection);

        orderDAO.listar(req.params.id, function(err, results){
            if(err){
                console.log('Erro no banco:' + err);
                res.status(500).send(err);
            } else{
                res.status(200).json(results);
            }
        });
        connection.end();
    });

    app.delete('/order/:id', function(req, res){
        var connection = app.persistencia.connectionFactory();
        var orderDAO = new app.persistencia.OrderDAO(connection);

        orderDAO.deletar(req.params.id, function(err, results){
            if(err) res.status(500).send(err);
            res.status(200).json(results);
        });
        connection.end();
    });
}