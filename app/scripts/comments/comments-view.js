import {ItemView} from 'backbone.marionette';
import template from './comments-template.hbs';
import moment from 'moment';

export default ItemView.extend({
  template: template,
  tagName: 'div',
  templateHelpers: {
      formated: function(date){
          return moment(new Date(date)).calendar()
      },
      typeFormated: function(type){
          return type == 'comment' ? 'Комментарий' : 'Отзыв';
      }
  },
  attributes() {
    return {
        "class": "media"
    };
  }
});
