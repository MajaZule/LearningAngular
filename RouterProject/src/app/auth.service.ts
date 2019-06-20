export class AuthService {   // fake service
    loggedIn = false;

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 800);
            }
        );
        return promise;
    }

    login() {
        console.log('you are logged in');
        this.loggedIn = true;
    }

    logout() {
        console.log('you are logged out');
        this.loggedIn = false;
    }
}