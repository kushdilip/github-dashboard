import Ember from 'ember';

export default Ember.Route.extend({
  url: 'https://api.github.com',
  model(){
    let url = this.get('url');
    let username = this.get('session').get('currentUser.username');
    let orgs = `${url}/users/${username}/orgs`;
    return Ember.$.ajax({url: orgs});
  },
  
  setupController(){
    this._super(...arguments);
  },
  
  actions: {
    getMembers(org){
      
    }
  }
});