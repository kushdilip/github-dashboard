import Ember from 'ember';

export default Ember.Route.extend({
  url: 'https://api.github.com',
  
  beforeModel: function() {
    return this.get('session').fetch().then(() => {
      console.log('session fetched');
    }, () => {
      console.log('no session to fetch');
    });
  },
  
  model(){
    let url = this.get('url');
    let username = this.get('session').get('currentUser.username');
    let orgs = `${url}/users/${username}/orgs`;
    let repos = `${url}/users/${username}/repos`;
    let hash = {
      orgs: Ember.$.ajax({url: orgs}),
      repos: Ember.$.ajax({url: repos})
    };
    return Ember.RSVP.hash(hash);
  },
  
  setupController(controller, hash){
    controller.set('orgs', hash.orgs);
    controller.set('repos', hash.repos);
  },
    
  actions: {
    signIn: function(provider) {
      this.controller.set('signingIn',true);
      this.controller.set('error', null);
      
      this.get("session").open("firebase", { provider: provider, settings: {scope:'read:org,repo'}}).then(() => {
        this.controller.set('signingIn',false);
        this.refresh();
        this.transitionTo('home');
      },
      (error) => {
        this.controller.set('signingIn',false);
        this.controller.set('error', 'Could not sign you in: '+error.message);
      });
    },
    
    logout: function() {
      this.get("session").close();
      this.transitionTo('login');
    },
    
    transitionToHome(){
      this.transitionTo('home');
    },
    
    transitionToOrg(route){
      this.transitionTo('org', route);
    },
    
    transitionToRepo(route){
      this.transitionTo('repo', route);
    },
    
    accessDenied: function() {
      this.transitionTo('login');
    }
  }
});