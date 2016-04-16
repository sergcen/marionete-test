import { CollectionView } from 'backbone.marionette';
import CommentView from './comments-view'

export default CollectionView.extend({
  className: 'comments-container',
  childView: CommentView
});
