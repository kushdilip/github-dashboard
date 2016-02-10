import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    getRepoStat(){
      let repos = this.get('repo');
      if (!Ember.isArray(repos)) {
        return;
      }
      
      let url = this.get('url');
      let accessToken = this.get('accessToken');
      
      let urls = repos.map(repo => `${url}/repos/${repo.full_name}/stats/contributors?access_token=${accessToken}`);
      let fns = urls.map(url => Ember.$.ajax({url: url}));
      
      Ember.RSVP.all(fns).then(contributions => this.set('contributions', contributions));
    }  
  }
});