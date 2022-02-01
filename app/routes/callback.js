import Route from '@ember/routing/route';
import Service from '@ember/service';
import { get } from '@ember/object';

export default Route.extend({
  auth: Service('auth'),
  beforeModel() {
    // check if we are authenticated
    // parse the url hash that comes back from auth0
    // if authenticated on login, redirect to the dashboard
    this.auth
      .handleAuthentication()
      .then(() => this.transitionTo('/dashboard'));
  },
});
