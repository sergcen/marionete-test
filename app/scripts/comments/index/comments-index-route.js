import {history} from 'backbone';
import {Route} from 'backbone-routing';
import CommentsCollection from '../comments-collection';
import CommentsLayout from '../comments-layout';
import FilterView from '../filter/filter-view';
import Radio from 'backbone.radio';
import storage from '../comments-storage';
import queryString from 'query-string';
import {Collection} from 'backbone';

let commentsChannel = Radio.channel('comments-filter');

export default Route.extend({
  initialize(options={}) {
    this.layout = options.layout;
    this.filterLayout = options.filterLayout;
    this.listenTo(this, 'enter', this.onEnter);
    this.listenTo(commentsChannel,{
        'filter:changed': this.onFilterChange
    });
    this.collection = new Collection();
  },
  
  onFilterChange(filter) {
      // update filter
      this.filterData = filter;
    //   this.render();
      this.collection.reset(this.getFilteredCollection());
      history.navigate(`comments?${queryString.stringify(this.filterData)}`);
  },
  
  fetch(filter) {
    // save router params as filter
    this.filterData = queryString.parse(filter);
    return storage.findAll().then(collection => {
      this.fullCollection = collection;
      this.collection.reset(this.getFilteredCollection())
    });
  },
  
  getFilteredCollection() {
    let filter = {};
    if (this.filterData.type) {
        filter.type = this.filterData.type;
    }
    let collection = this.fullCollection.where(filter);
    collection.sort((item1, item2)=>{
        if (this.filterData.dateSort == 0) {
            return new Date(item1.get('date')) - new Date(item2.get('date'));
        } else {
            return new Date(item2.get('date')) - new Date(item1.get('date'));
        }
    })
    return collection;
  },
  
  render() {
    this.comments = new CommentsLayout({
        collection: this.collection
    });
    this.filter = new FilterView(this.filterData);
    this.layout.show(this.comments);
    this.filterLayout.show(this.filter);
  }
});