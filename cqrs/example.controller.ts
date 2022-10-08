import { CommandBus, QueryBus } from '../packages/codespark/cqrs'
import { Comment } from '../repositories/comment.repository'
import { UpdateCommentCommand } from './commands/update-comment/update-comment.command'
import { ListCommentsQuery } from './queries/list-comments.query'

export class ExampleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  updateComment(id: string, body: string): Promise<Comment> {
    return this.commandBus.execute(new UpdateCommentCommand(id, body))
  }

  listComments(): Promise<Comment[]> {
    return this.queryBus.execute(new ListCommentsQuery())
  }
}
