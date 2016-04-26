import $ from 'jquery';
import {Collection} from 'backbone';
import Model from './comments-model';

export default Collection.extend({
  url: ['/api/comments.json','/api/product_comments.json'],
  model: Model,
  fetch() {
    return $.when.apply($,
        this.url.map((url) => $.ajax(url).done(d => {
          this.add(d.map(item => {
            // set unique id for each type
            item.id = item.id + '_' + item.type;
            return item;
          }))
        }))
      )
  }
});