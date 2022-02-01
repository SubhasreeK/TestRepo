import Service from '@ember/service';
import { computed } from '@ember/object';
import config from 'ember-js-auth/config/environment';

export default Service.extends({
  auth0: computed(function () {
    return new auth0.WebAuth({
      // setting up the config file will be covered below
      domain: config.auth0.domain, // domain from auth0
      clientID: config.auth0.clientId, // clientId from auth0
      redirectUri: config.auth0.callbackUrl,
      audience: `https://${config.auth0.domain}/userinfo`,
      responseType: 'token',
      scope: 'openid profile', // adding profile because we want username, given_name, etc
    });
  }),
  login() {
    this.auth0.authorize();
  },
  handleAuthentication() {
    return new Promise((resolve) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return false;

        if (authResult && authResult.accessToken) {
          this.setUser(authResult.accessToken);
        }

        return resolve();
      });
    });
  },
  isAuthenticated: computed.reads('checkLogin'),
  setUser(token) {
    // once we have a token, we are able to go get the users information
    this.auth0.client.userInfo(token, (err, profile) =>
      this.set('user', profile)
    );
  },
  checkLogin() {
    // check to see if a user is authenticated, we'll get a token back
    this.auth0.checkSession({}, (err, authResult) => {
      // if we are wrong, stop everything now
      if (err) return err;
      this.setUser(authResult.accessToken);
    });
  },
  logout() {
    this.auth0.logout({
      clientID: config.auth0.clientId,
      returnTo: 'http://localhost:4200',
    });
  },
});
