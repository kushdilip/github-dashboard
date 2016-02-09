import Ember from 'ember';

export default Ember.Route.extend({
  onActivate: function(){
    if (this.get('session').get('isAuthenticated')) {
      this.transitionTo('index');
    }
  }.on('activate')
});