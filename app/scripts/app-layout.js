
import {LayoutView} from 'backbone.marionette';
import template from './app-template.hbs';

export default LayoutView.extend({
  el: '.application',
  template: template,

  regions: {
    content : '.application__content',
    filter: '.application__filter'
  }
});