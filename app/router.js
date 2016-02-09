import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.authenticatedRoute('home', {path: '/home'});
  this.authenticatedRoute('org', {path: '/orgs/:org'});
  this.authenticatedRoute('repo', {path: '/repos/:repo'});
  this.route('login');
});

export default Router;
