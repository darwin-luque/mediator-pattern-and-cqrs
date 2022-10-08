import { Aggregate } from '../aggregate'
import { PostCommentedEvent } from '../ddd/events/post-commented.event'
import { randomString } from '../utils'

export class Comment extends Aggregate {
  constructor(
    public readonly id: string,
    public readonly body: string,
    public readonly author: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    super()
  }
}

export class CommentRepository {
  constructor(private comments: Comment[] = []) {}

  create(
    data: Partial<Omit<Omit<Omit<Comment, 'createdAt'>, 'updatedAt'>, 'id'>>,
  ): Comment {
    return new Comment(
      randomString(8),
      data.body!,
      data.author!,
      new Date(),
      new Date(),
    )
  }

  save(comment: Comment): Comment {
    const existing = this.findOneById(comment.id)
    if (existing) {
      this.comments = this.comments.map((c) =>
        c.id === comment.id ? comment : c,
      )
    } else {
      this.comments.push(comment)
      this.onInsert(comment)
    }

    return comment
  }

  findOneById(id: string): Comment | undefined {
    return this.comments.find((c) => c.id === id)
  }

  findAll() {
    return this.comments
  }

  remove(comment: Comment): Comment {
    this.comments = this.comments.filter((c) => c.id !== comment.id)
    return comment
  }

  onInsert(comment: Comment) {
    comment.apply(new PostCommentedEvent(comment))
  }
}
