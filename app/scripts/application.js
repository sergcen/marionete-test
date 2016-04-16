import $ from 'jquery';
import _ from 'lodash';
import {Application} from 'backbone.marionette';
import AppLayout from './app-layout';

export default Application.extend({
  initialize() {
    this.$body = $(document.body);
    this.layout = new AppLayout();
    this.layout.render();
  }
});