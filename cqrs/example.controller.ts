import { CommandBus } from '../buses/command-bus'
import { Comment } from '../repositories/comment.repository'
import { UpdateCommentCommand } from './commands/update-comment/update-comment.command'

export class ExampleController {
  constructor(private readonly commandBus: CommandBus) {}

  updateComment(id: string, body: string): Promise<Comment> {
    return this.commandBus.execute(new UpdateCommentCommand(id, body))
  }
}
