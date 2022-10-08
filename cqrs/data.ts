import { Comment } from '../repositories/comment.repository'

export const comments: Comment[] = [
  new Comment('0', 'First comment', 'first author', new Date(), new Date()),
  new Comment('1', 'Second comment', 'second author', new Date(), new Date()),
  new Comment('2', 'Third comment', 'first author', new Date(), new Date()),
  new Comment('3', 'Forth comment', 'third author', new Date(), new Date()),
]
