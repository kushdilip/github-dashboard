import Ember from 'ember';

export default Ember.Route.extend({
  url: 'https://api.github.com',
  model(){
    let url = this.get('url');
    let username = this.get('session').get('currentUser.username');
    let orgs = `${url}/users/${username}/orgs`;
    return Ember.$.ajax({url: orgs});
  },
    
  accessToken: Ember.computed.alias('session.currentUser.accessToken'),
  
  actions: {
    getMemberAndRepos(org){
      this.controller.set('organisation', org);
      
      let url = this.get('url');
      let accessToken = this.get('accessToken');
      
      let memberUrl = `${url}/orgs/${org}/members?access_token=${accessToken}`;
      let repoUrl = `${url}/orgs/${org}/repos?access_token=${accessToken}&per_page=100`;
      
      let hash = {
        members: Ember.$.ajax({url: memberUrl}),
        repos: Ember.$.ajax({url: repoUrl})  
      };
      
      Ember.RSVP.hash(hash).then(hash => {
        this.controller.set('members', hash.members);
        this.controller.set('repos', hash.repos);
      });
    }
  }
});