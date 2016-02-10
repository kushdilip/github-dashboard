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
  },
  
  actions: {
    getRepoStat(){
      let repos = this.controller.get('repo');
      if (!Ember.isArray(repos)) {
        return;
      }
      
      let url = this.get('url');
      let accessToken = this.get('accessToken');
      
      let urls = repos.map(repo => `${url}/repos/${repo.full_name}/stats/contributors?access_token=${accessToken}`);
      let fns = urls.map(url => Ember.$.ajax({url: url}));
      
      Ember.RSVP.all(fns).then(contributions => this.controller.set('contributions', contributions));
    }  
  }
});