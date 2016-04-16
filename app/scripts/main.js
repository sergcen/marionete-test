import Backbone from 'backbone';

import CommentsRouter from './comments/comments-router';
import Application from './application';

var app = new Application();


app.index = new CommentsRouter({
  container: app.layout.content,
  filter: app.layout.filter
});

Backbone.history.start();


