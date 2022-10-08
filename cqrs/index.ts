import { Logger } from '../packages/codespark/common'
import { CommandBus, QueryBus } from '../packages/codespark/cqrs'
import { CommentRepository } from '../repositories/comment.repository'
import { UpdateCommentHandler } from './commands/update-comment/update-comment.handler'
import { comments } from './data'
import { ExampleController } from './example.controller'
import { ListCommentsHandler } from './queries/list-comments.handler'

export async function bootstrap() {
  const logger = new Logger('CQRS Example')
  const commentsRepository = new CommentRepository(comments)

  const commandBus = new CommandBus()
  commandBus.registerHandlers(new UpdateCommentHandler(commentsRepository))

  const queryBus = new QueryBus()
  queryBus.registerHandlers(new ListCommentsHandler(commentsRepository))

  const exampleController = new ExampleController(commandBus, queryBus)
  let comment = commentsRepository.findOneById('1')

  logger.log({ comment })

  comment = await exampleController.updateComment('1', 'updated comment')

  const allComments = await exampleController.listComments()

  logger.log({ allComments })
}
