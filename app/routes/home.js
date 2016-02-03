import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    let accessToken = this.get('session').get('currentUser.accessToken');
    return null;
  }
});