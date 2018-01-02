export class AuthService {
    loggedIn = true;

    isAuthenticated() {
      const promise = new Promise(
        (resolve, reject) => {
          resolve(this.login);
        }
      );
      return promise;
    }

    login() {
      if (localStorage.getItem('currentUser')) {
        // logged in so return true
        console.log(localStorage.getItem('currentUser'));
         return true;
      }
    }

    logout() {
      this.loggedIn = false;
    }
  }
