import { CommandBus } from '../buses/command-bus'
import { QueryBus } from '../buses/query-bus'
import { CommentRepository } from '../repositories/comment.repository'
import { UpdateCommentHandler } from './commands/update-comment/update-comment.handler'
import { comments } from './data'
import { ExampleController } from './example.controller'
import { ListCommentsHandler } from './queries/list-comments.handler'

async function bootstrap() {
  const commentsRepository = new CommentRepository(comments)

  const commandBus = new CommandBus()
  commandBus.registerHandlers(new UpdateCommentHandler(commentsRepository))

  const queryBus = new QueryBus()
  queryBus.registerHandlers(new ListCommentsHandler(commentsRepository))

  const exampleController = new ExampleController(commandBus, queryBus)
  let comment = commentsRepository.findOneById('1')

  console.log({ comment })

  comment = await exampleController.updateComment('1', 'updated comment')

  const allComments = await exampleController.listComments()

  console.log({ allComments })
}

bootstrap()
