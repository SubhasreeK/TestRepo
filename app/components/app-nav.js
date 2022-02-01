import Component from '@ember/component';
import Service from '@ember/service';

export default Component.extend({
  router: Service(),
  auth: Service('auth'),
  actions: {
    /**
     * From service/auth, starting the login process
     */
    login() {
      this.auth.login();
    },

    goHome() {
      this.router.transitionTo('home');
    },

    goDashboard() {
      this.router.transitionTo('dashboard');
    },

    /**
     * From service/auth, removing the saved token from the session.
     */
    logout() {
      this.auth.logout();
    },
  },
});
