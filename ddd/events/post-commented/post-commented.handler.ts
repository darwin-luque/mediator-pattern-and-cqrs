import { IEventHandler } from '../../../buses/event-bus'
import { PostCommentedEvent } from './post-commented.event'

export class PostCommentedHandler implements IEventHandler<PostCommentedEvent> {
  event = PostCommentedEvent

  handle(event: PostCommentedEvent) {
    console.log({
      timestamp: new Date().toISOString(),
      event: event.constructor.name,
      data: event,
    })
  }
}
