import Ember from 'ember';

export default Ember.Route.extend({
  onActivate: function(){
    if (this.get('session').get('isAuthenticated')) {
      this.transitionTo('index');
    }
  }.on('activate'),
  
  actions: {
    signIn: function(provider) {
      this.controller.set('signingIn',true);
      this.controller.set('error', null);
      
      Ember.run.schedule('afterRender', this, () => {
        Ember.$('#signin-modal-back').one('click', () => {
          this.controller.set('signingIn',false);
        });
        this.get("session").open("firebase", { provider: provider, settings: {scope:'read:org'}}).then(() => {
          this.controller.set('signingIn',false);
          this.transitionTo('home');
        },
        (error) => {
          this.controller.set('signingIn',false);
          this.controller.set('error', 'Could not sign you in: '+error.message);
        });  
      });
    }
  }
});