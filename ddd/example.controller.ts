import { CommandBus } from '../packages/codespark/cqrs'
import { CommentPostCommand } from './commands/comment-post/comment-post.command'

export class ExampleController {
  constructor(private readonly commandBus: CommandBus) {}

  async createComment(body: string, author: string) {
    return this.commandBus.execute(new CommentPostCommand(body, author))
  }
}
