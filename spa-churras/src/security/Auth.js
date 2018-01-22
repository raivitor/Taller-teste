const Auth = {
    isAuthenticated: false,
    id_user: "",
    email_user: "",
    verifyAuth (){
        //if (isAuthenticated)
        return this.isAuthenticated;
    },
    authenticate(id_user, email_user) {
        this.isAuthenticated = true
        this.id_user = id_user;
        this.email_user = email_user;
    },
    getId(){
        return this.id_user;
    },
    getEmail(){
      return this.email_user;  
    },
    logout() {
        this.isAuthenticated = false
    }
}

export default Auth;