import { ICommandHandler } from '../../buses/command-bus'
import { CommentRepository } from '../../repositories/comment.repository'
import { CommentPostCommand } from './comment-post.command'

export class CommentPostHandler implements ICommandHandler<CommentPostCommand> {
  command = CommentPostCommand

  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: CommentPostCommand) {
    const comment = this.commentRepository.create({
      body: command.body,
      author: command.author,
    })

    return this.commentRepository.save(comment)
  }
}
