module.exports = function (app) {
    app.get('/produtos', function (req, res) {
        var connection = app.persistencia.connectionFactory();

        var produtosDAO = new app.persistencia.ProdutosDAO(connection);

        produtosDAO.listar(function (erros, resultados) {
            if (erros) {
                return next(erros);
            }
            res.format({
                html: function () {
                    res.json(resultados)
                    //res.render('produtos/lista', { lista: resultados });
                },
                json: function () {
                    res.json(resultados)
                }
            });
        });
        connection.end();
    });

    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form', { errosValidacao: {}, produto: {} });
    });

    app.post('/order', function (req, res) {
        var produto = req.body;

        var connection = app.persistencia.connectionFactory();
        var orderDAO = new app.persistencia.OrderDAO(connection);

        orderDAO.salvar(produto, function (erro, resultados, fields) {
            if (erro) {
                console.log('Erro ao inserir no banco:' + erro);
                res.status(500).send(erro);
            }
            else {
                console.log('Order criada');
                res.status(201).json(resultados);
            }
        });
        connection.end();
    });

    app.get('/produtos/:id', function (req, res) {
        res.render('produtos/editar', { errosValidacao: {}, produto: {}, id: req.params.id });
        console.log(req.params.id);
    })
}