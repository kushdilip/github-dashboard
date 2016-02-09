import Ember from 'ember';

export default Ember.Route.extend({
  url: 'https://api.github.com',
  
  beforeModel: function() {
    return this.get('session').fetch().then(function() {    
      console.log('session fetched');
    }, function() {
      console.log('no session to fetch');
    });
  },
  actions: {
    logout: function() {
      this.get("session").close();
      this.transitionTo('login');
    },
    accessDenied: function() {
      this.transitionTo('login');
    }
  }
});