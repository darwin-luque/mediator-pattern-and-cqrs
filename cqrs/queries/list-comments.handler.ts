import { IQueryHandler } from '../../buses/query-bus'
import {
  Comment,
  CommentRepository,
} from '../../repositories/comment.repository'
import { ListCommentsQuery } from './list-comments.query'

export class ListCommentsHandler implements IQueryHandler<ListCommentsQuery> {
  query = ListCommentsQuery

  constructor(private commentsRepository: CommentRepository) {}

  async execute(query: ListCommentsQuery): Promise<Comment[]> {
    return this.commentsRepository.findAll()
  }
}
