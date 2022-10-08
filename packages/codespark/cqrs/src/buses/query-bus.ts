import { Type } from '@codespark/common'

export interface IQuery {}

export interface IQueryHandler<TQuery extends IQuery = any, TResult = any> {
  query: Type<TQuery>
  execute(query: TQuery): Promise<TResult>
}

export class QueryBus {
  private handlers: IQueryHandler[] = []

  registerHandlers(...handlers: IQueryHandler[]) {
    this.handlers = handlers
  }

  execute(query: IQuery) {
    const handler = this.handlers.find((h) => query instanceof h.query)
    if (!handler) {
      throw new Error(`No handler found for query ${query.constructor.name}`)
    }

    return handler.execute(query)
  }
}
