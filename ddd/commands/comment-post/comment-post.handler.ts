import { ICommandHandler } from '../../../packages/codespark/cqrs'
import { CommentRepository } from '../../../repositories/comment.repository'
import { CommentPostCommand } from './comment-post.command'

export class CommentPostHandler implements ICommandHandler<CommentPostCommand> {
  command = CommentPostCommand

  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: CommentPostCommand) {
    const comment = this.commentRepository.create({
      body: command.body,
      author: command.author,
    })

    const savedComment = this.commentRepository.save(comment)

    savedComment.commit()
    return savedComment
  }
}
