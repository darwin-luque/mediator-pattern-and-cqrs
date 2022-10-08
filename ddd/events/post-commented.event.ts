import { Comment } from '../../repositories/comment.repository'

export class PostCommentedEvent {
  constructor(public comment: Comment) {}
}
