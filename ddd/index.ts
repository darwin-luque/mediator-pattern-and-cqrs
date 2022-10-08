import { CommentPostHandler } from './commands/comment-post/comment-post.handler'
import { CommentRepository } from '../repositories/comment.repository'
import { ExampleController } from './example.controller'
import { Logger } from '../packages/codespark/common'
import { CommandBus } from '../packages/codespark/cqrs'

export async function bootstrap() {
  const logger = new Logger('DDD Example')
  const commandBus = new CommandBus()

  const commentRepository = new CommentRepository()
  commandBus.registerHandlers(new CommentPostHandler(commentRepository))

  const exampleController = new ExampleController(commandBus)

  const comment = await exampleController.createComment(
    'Hello world',
    'John Doe',
  )

  logger.log({ comment })
}
