module.exports = function (app) {
    app.get('/user', function (req, res) {
        var connection = app.persistencia.connectionFactory();
        var userDAO = new app.persistencia.UserDAO(connection);

        userDAO.listar(function (erros, resultados) {
            if (erros) {
                console.log('Erro no banco:' + erro);
                res.status(500).send(erro);
            }
            res.status(200).send(resultados);
        });
        connection.end();
    });

    app.post('/user', function (req, res) {
        req.assert('email', 'Email deve ser preenchido').notEmpty();
        req.assert('password', 'Senha deve ser preenchida').notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            console.log('Erros de validacao encontrados');
            res.status(400).send(erros);
            return;
        }

        var connection = app.persistencia.connectionFactory();
        var userDAO = new app.persistencia.UserDAO(connection);
        var user = req.body;
        userDAO.salvar(user, function (err, resultado) {
            if (err) {
                console.log('erro no banco ' + err);
                res.status(500).send(err);
            }
            else {
                console.log('User criado');
                res.location('/user/' + resultado.insertId);
                res.status(201).json(user);
            }
        });
        connection.end();
    });

    app.post('/user/login', function (req, res) {
        req.assert('email', 'Email deve ser preenchido').notEmpty();
        req.assert('password', 'Senha deve ser preenchida').notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            console.log('Erros de validacao encontrados');
            res.status(400).send(erros);
            return;
        }
        
        var connection = app.persistencia.connectionFactory();
        var userDAO = new app.persistencia.UserDAO(connection);

        var user = req.body;
        userDAO.logar(user, function (err, resultado) {
            if (err) {
                console.log('erro no banco: ' + err);
                res.status(500).send(err);
            } else {
                console.log('Usuario logado');
                if (resultado.length > 0) res.status(202).json(resultado);
                else res.status(401).json(resultado);
            }
        });
        connection.end();
    })
}