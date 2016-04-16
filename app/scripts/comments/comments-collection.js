import {Collection} from 'backbone';
import Model from './comments-model';

export default Collection.extend({
  url: '/api/comments.json',
  model: Model
});