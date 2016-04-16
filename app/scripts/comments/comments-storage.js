import Storage from 'backbone.storage';
import Model from './comments-model';
import Collection from './comments-collection';

var CommentsStorage = Storage.extend({
  model: Model,
  collection: Collection
});

export default new CommentsStorage();