import Route from '@ember/routing/route';
import Service from '@ember/service';
export default  Route.extends  ({
    auth: Service(),
  beforeModel() {
    this.auth.checkLogin();

  }
});
