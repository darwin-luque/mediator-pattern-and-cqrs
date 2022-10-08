import { CommandBus } from '../buses/command-bus'
import { CommentRepository } from '../repositories/comment.repository'
import { UpdateCommentHandler } from './commands/update-comment/update-comment.handler'
import { comments } from './data'
import { ExampleController } from './example.controller'

async function bootstrap() {
  const commandBus = new CommandBus()
  const commentsRepository = new CommentRepository(comments)

  commandBus.registerHandlers(new UpdateCommentHandler(commentsRepository))

  const exampleController = new ExampleController(commandBus)
  let comment = commentsRepository.findOneById('1')

  console.log({ comment })

  comment = await exampleController.updateComment('1', 'updated comment')

  console.log({ comment })
}

bootstrap()
