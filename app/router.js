import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  
  metrics: Ember.inject.service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.authenticatedRoute('home', {path: '/home'});
  this.authenticatedRoute('org', {path: '/orgs/:org'});
  this.authenticatedRoute('repo', {path: '/repos/:repo'});
  this.route('login');
});

export default Router;
