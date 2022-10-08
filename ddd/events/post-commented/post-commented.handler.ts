import { IEventHandler } from '../../../buses/event-bus'
import { Logger } from '../../../utils/logger'
import { PostCommentedEvent } from './post-commented.event'

export class PostCommentedHandler implements IEventHandler<PostCommentedEvent> {
  private logger = new Logger(PostCommentedHandler.name)
  event = PostCommentedEvent

  handle(event: PostCommentedEvent) {
    this.logger.log({
      event: event.constructor.name,
      data: event,
    })
  }
}
