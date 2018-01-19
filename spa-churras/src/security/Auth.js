const Auth = {
    isAuthenticated: false,
    verifyAuth (){
        //if (isAuthenticated)
        return this.isAuthenticated;
    },
    authenticate() {
        this.isAuthenticated = true
    },
    signout() {
        this.isAuthenticated = false
    }
}

export default Auth;