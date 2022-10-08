class A {}

export interface Type<T> extends Function {
  new (...args: any[]): T
}

export interface ICommand extends A {}

export interface ICommandHandler<
  TCommand extends ICommand = any,
  TResult = any
> {
  command: Type<TCommand>
  execute(command: TCommand): Promise<TResult>
}

export class CommandBus {
  private handlers: ICommandHandler[] = []

  registerHandlers(...handlers: ICommandHandler[]) {
    this.handlers = handlers
  }

  execute(command: ICommand) {
    const handler = this.handlers.find((h) => command instanceof h.command)
    if (!handler) {
      throw new Error(
        `No handler found for command ${command.constructor.name}`,
      )
    }

    return handler.execute(command)
  }
}
