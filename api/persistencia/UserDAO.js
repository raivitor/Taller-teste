class UserDAO {
    constructor(connection) {
        this._connection = connection;
    }
    listar(callback) {
        this._connection.query('SELECT * FROM users', callback);
    }
    salvar(user, callback) {
        this._connection.query('INSERT INTO users set ?', user, callback);
    }
    logar(user, callback){
        this._connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [user.email, user.password],  callback);
    }
    update(user, callback){
        this._connection.query('UPDATE users set email = ?, password = ? where id_user = ?', [user.email, user.password, user.id_user], callback);
    }
}

module.exports = function () {
    return UserDAO;
}