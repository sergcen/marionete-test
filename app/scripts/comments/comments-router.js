import {Router} from 'backbone-routing';
import CommentsRoute from './index/comments-index-route';
import queryString from 'query-string';
import Backbone from 'backbone';


export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.filterLayout = options.filter;
    this.listenTo(this, 'before:enter', this.onBeforeEnter);
  },

  onBeforeEnter() {

  },

  routes: {
    'comments(?*querystring)': 'comments',
    '*path': 'redirect'
  },
  
  redirect() {
      Backbone.history.navigate('comments',{trigger: true});
  },
  
  comments(params) {
    return new CommentsRoute({
        params: queryString.parse(params),
        layout: this.container,
        filterLayout: this.filterLayout
    });
  }
});