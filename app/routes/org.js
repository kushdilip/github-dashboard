import Ember from 'ember';

export default Ember.Route.extend({
  url: 'https://api.github.com',
  accessToken: Ember.computed.alias('session.currentUser.accessToken'),
  
  model: function(params) {
    let org = params.org;
    let url = this.get('url');
    let accessToken = this.get('accessToken');

    let repoUrl = `${url}/orgs/${org}/repos?access_token=${accessToken}&per_page=100`;
    return Ember.$.ajax({url: repoUrl});
  }
});