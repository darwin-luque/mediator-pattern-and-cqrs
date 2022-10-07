class A {}

export type Command = { new (...args: unknown[]): A }
export interface CommandHandler {
  execute(c: Command): void | Promise<void>
}

export class CommandBus {
  private handlers: CommandHandler[] = []

  registerHandlers(handlers: CommandHandler[]) {
    this.handlers = handlers
  }

  execute(command: Command) {
    const handler = this.handlers.find((h) => h instanceof command)
    if (!handler) {
      throw new Error(`No handler found for command ${command.name}`)
    }

    return handler.execute(command)
  }
}
