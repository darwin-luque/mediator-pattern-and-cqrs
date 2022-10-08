import { CommandBus } from '../buses/command-bus'
import { CommentRepository } from '../repositories/comment.repository'
import { CommentPostHandler } from './comment-post/comment-post.handler'
import { ExampleController } from './example.controller'

async function bootstrap() {
  const commandBus = new CommandBus()

  const commentRepository = new CommentRepository()
  commandBus.registerHandlers(new CommentPostHandler(commentRepository))

  const exampleController = new ExampleController(commandBus)

  const comment = await exampleController.createComment('Hello world', 'John Doe');

  console.log({ comment });
}

bootstrap()
