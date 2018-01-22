const Auth = {
    _isAuthenticated: false,
    _id_user: "",
    _email_user: "",
    _token: "",
    verifyAuth() {
        return this._isAuthenticated;
        /*
        if (this._isAuthenticated && this._token){
            $.ajax({
                url: 'http://localhost:3000/auth/verify',
                contentType: 'application/json',
                dataType: 'json',
                type: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-access-token': this._token,
                },
                success: function (result) {
                    console.log("chegou aceito");
                    console.log(result);
                    return true
                },
                error: function (err) {
                    console.log("chegou falso");
                    console.log(err);
                    return false
                    
                },
            });
        
        }*/
    },
    authenticate(id_user, email_user, token) {
        this._isAuthenticated = true
        this._id_user = id_user;
        this._email_user = email_user;
        this._token = token
    },
    getId() {
        return this._id_user;
    },
    getEmail() {
        return this._email_user;
    },
    logout() {
        this._isAuthenticated = false,
        this._id_user = "";
        this._email_user = "";
        this._token = ""
    }
}

export default Auth;