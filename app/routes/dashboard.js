import Route from '@ember/routing/route';
import Service from '@ember/service';

export default Route.extend({
  auth: Service('auth'),
  beforeModel() {
    // this is where we check if a user is authenticated
    // if not authenticated, kick them to the home page
    if (!this.auth.isAuthenticated) {
      this.transitionTo('/');
    }
  },
});
