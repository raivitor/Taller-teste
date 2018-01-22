module.exports = function (app) {
    app.get('/company', function (req, res) {
        var connection = app.persistencia.connectionFactory();
        var companyDAO = new app.persistencia.CompanyDAO(connection);

        companyDAO.listar(function (err, results) {
            if (err) {
                console.log('Erro no banco:' + err);
                res.status(500).send(err);
            }
            res.status(200).send(results);
        });
        connection.end();
    });

    app.get('/company/:id', function (req, res) {
        var connection = app.persistencia.connectionFactory();
        var companyDAO = new app.persistencia.CompanyDAO(connection);

        companyDAO.uniqueCompany(req.params.id, function (err, results) {
            if (err) {
                console.log('Erro no banco:' + err);
                res.status(500).send(err);
            }
            res.status(200).send(results);
        });
        connection.end();
    });

    app.post('/company', function (req, res) {
        req.assert('company_name', 'Nome deve ser preenchido').notEmpty();
        req.assert('company_cnpj', 'CNPJ deve ser preenchido').notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            console.log('Erros de validacao encontrados');
            res.status(400).send(erros);
            return;
        }

        var connection = app.persistencia.connectionFactory();
        var companyDAO = new app.persistencia.CompanyDAO(connection);
        var company = req.body;
        companyDAO.salvar(company, function (err, resultado) {
            if (err) {
                console.log('erro no banco ' + err);
                res.status(500).send(err);
            }
            else {
                console.log('company criada');
                res.status(201).json(company);
            }
        });
        connection.end();
    });
}