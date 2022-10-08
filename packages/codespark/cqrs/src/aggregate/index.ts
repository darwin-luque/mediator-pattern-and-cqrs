import { EventBus, IEvent } from '@codespark/cqrs'

export class Aggregate {
  autoCommit = false
  constructor(public readonly eventBus = new EventBus()) {}

  private events: IEvent[] = []

  publish(event: IEvent) {
    this.eventBus.publish(event)
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
