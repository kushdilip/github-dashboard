import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.get("session").fetch().catch(function() {});
  },
  actions: {
    signIn: function(provider) {
      this.get("session").open("firebase", { provider: provider}).then(auth => {
        console.log(auth);
        this.transitionTo('home');
      },(error) => {
        this.controller.set('error', 'Could not sign you in: '+error.message);
      });
    },

    logout: function() {
      this.get("session").close();
    }
  }
});