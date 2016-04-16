import {LayoutView} from 'backbone.marionette';
import Radio from 'backbone.radio';
import template from './filter-template.hbs';

let commentsChannel = Radio.channel('comments-filter');

export default LayoutView.extend({
  template: template,
  initialize(filter={}){
    this.currentFilter = filter;
    this.listenTo(commentsChannel,{
        'filter:changed': this.onFilterChange
    }); 
  },
  
  serializeData(){
    return {
        filterTypes: [
            {name: 'Все', key: ''},
            {name: 'Комментарии', key: 'comment'},
            {name: 'Отзывы', key: 'product_comment'}
        ].map(item => {
            item.active = item.key == this.currentFilter.type;
            return item;
        }),
        sorts: [
            {name: 'Новые', key: '1'},
            {name: 'Старые', key: '0'},
        ].map(item => {
            item.active = item.key == this.currentFilter.dateSort;
            return item;
        }),
    }
  },
  
  ui: {
      filter: '.filter'
  },
  
  events: {
    'change @ui.filter': 'changeFilter'
  },
  
  changeFilter() {
    let filter = {};
    
    this.ui.filter.each((index, el) => {
        if (el.value) {
            filter[el.name] = el.value;
        }
    });
    commentsChannel.trigger('filter:changed', filter);       
  }
});