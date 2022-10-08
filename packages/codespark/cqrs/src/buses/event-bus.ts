import { Type } from '../../../common'

export interface IEvent {}

export interface IEventHandler<T extends IEvent = any> {
  event: Type<T>
  handle(event: T): any
}

export class EventBus {
  constructor(private handlers: IEventHandler[] = []) {}

  registerHandlers(...handlers: IEventHandler[]) {
    this.handlers = handlers
  }

  publish(event: IEvent) {
    const handler = this.handlers.find((h) => event instanceof h.event)
    if (!handler) {
      throw new Error(`No handler found for event ${event.constructor.name}`)
    }

    return handler.handle(event)
  }
}
