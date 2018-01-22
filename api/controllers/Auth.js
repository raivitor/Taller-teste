var jwt = require('jsonwebtoken');

module.exports = function (app) {

    app.post('/auth', function (req, res) {
        req.assert('email', 'Email deve ser preenchido').notEmpty();
        req.assert('password', 'Senha deve ser preenchida').notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            console.log('Erros de validacao encontrados: ' + erros);
            res.status(400).send(erros);
            return;
        }

        var connection = app.persistencia.connectionFactory();
        var userDAO = new app.persistencia.UserDAO(connection);
        var user = req.body;

        userDAO.logar(user, function (err, results, fields) {
            if (err) {
                console.log('erro no banco: ' + err);
                res.status(500).send(err);
            } else {
                console.log('Usuario logado');
                if (results.length > 0) {
                    var token = jwt.sign({ email: results.email }, app.get('secret'), {
                        expiresIn: 86400 // 24 horas
                    });
                    console.log('Autenticado: token adicionado na resposta');
                    res.set('x-access-token', token); // adicionando token no cabeçalho de resposta
                    //res.end(); // enviando a resposta
                    res.status(202).json({ user: results[0], token });
                }
                else res.status(401).json(results);
            }
        });
        connection.end();
    });

    app.post('/auth/verify', function (req, res, next) {
        var token = req.headers['x-access-token']; // busca o token no header da requisição

        if (token) {
            console.log('Token recebido, decodificando');
            jwt.verify(token, app.get('secret'), function (err, decoded) {
                if (err) {
                    console.log('Token rejeitado');
                    return res.sendStatus(401);
                } else {
                    console.log('Token aceito')
                    // guardou o valor decodificado do token na requisição. No caso, o login do usuário.
                    req.usuario = decoded;
                    next();
                    res.status(202).json({ user: req.usuario, token });
                }
            });
        } else {
            console.log('Nenhum token enviado');
            return res.sendStatus(401);
        }
    });
}