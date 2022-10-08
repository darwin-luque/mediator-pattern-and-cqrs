import { EventBus, IEvent } from '../buses/event-bus'
import { PostCommentedHandler } from '../ddd/events/post-commented/post-commented.handler'

const eventBus = new EventBus()
eventBus.registerHandlers(new PostCommentedHandler())

export class Aggregate {
  autoCommit = false

  private events: IEvent[] = []

  publish(event: IEvent) {
    eventBus.publish(event)
  }

  publishAll() {
    this.events.forEach((event) => this.publish(event))
  }

  commit() {
    this.publishAll()
    this.events = []
  }

  apply(event: IEvent) {
    if (this.autoCommit) {
      this.publish(event)
    } else {
      this.events.push(event)
    }
  }
}
