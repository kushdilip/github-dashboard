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
    signIn: function(provider) {
      this.controller.set('signingIn',true);
      this.controller.set('error', null);
      
      Ember.run.schedule('afterRender', this, () => {
        Ember.$('#signin-modal-back').one('click', () => {
          this.controller.set('signingIn',false);
        });
        this.get("session").open("firebase", { provider: provider, settings: {scope:'read:org,repo'}}).then(() => {
          this.controller.set('signingIn',false);
          this.transitionTo('home');
        },
        (error) => {
          this.controller.set('signingIn',false);
          this.controller.set('error', 'Could not sign you in: '+error.message);
        });  
      });
    },
    logout: function() {
      this.get("session").close();
      this.transitionTo('login');
    },
    accessDenied: function() {
      this.transitionTo('login');
    }
  }
});