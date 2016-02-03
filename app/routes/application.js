import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.get("session").fetch().catch(function() {
      console.log('No session');
    });
  },
  actions: {
    signIn: function(provider) {
      this.controller.set('error', null);
      this.get("session").open("firebase", { provider: provider}).then(() => {},
      (error) => {
        this.controller.set('error', 'Could not sign you in: '+error.message);
      });
    },

    logout: function() {
      this.get("session").close();
    }
  }
});