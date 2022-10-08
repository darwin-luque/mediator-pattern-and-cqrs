import { ICommandHandler } from '../../../packages/codespark/cqrs'
import {
  Comment,
  CommentRepository,
} from '../../../repositories/comment.repository'
import { UpdateCommentCommand } from './update-comment.command'

export class UpdateCommentHandler
  implements ICommandHandler<UpdateCommentCommand> {
  constructor(private commentsRepository: CommentRepository) {}
  command = UpdateCommentCommand

  async execute(command: UpdateCommentCommand): Promise<Comment> {
    const comment = this.commentsRepository.findOneById(command.id)

    if (!comment) {
      throw new Error(`Comment with id ${command.id} not found`)
    }

    return this.commentsRepository.save(
      Object.assign<Comment, Partial<Comment>>(comment, {
        body: command.content,
      }),
    )
  }
}
