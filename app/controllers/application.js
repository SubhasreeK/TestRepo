import Controller from '@ember/controller';
import Service from '@ember/service';

export default Controller.extend({
  auth: Service(),
  init() {
    this._super(...arguments);
  },
});
