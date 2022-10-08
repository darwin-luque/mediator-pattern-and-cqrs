import { isPrimitive } from './index'

export class Logger {
  constructor(private readonly name = 'Logger') {}

  valueParser(value: unknown): string {
    return isPrimitive(value) ? `${value}` : JSON.stringify(value, null, 2)
  }

  log(value: unknown) {
    const message = this.valueParser(value)
    this.render(message, 'log')
  }

  verbose(value: unknown) {
    const message = this.valueParser(value)
    this.render(message, 'verbose')
  }

  warn(value: unknown) {
    const message = this.valueParser(value)
    this.render(message, 'warn')
  }

  error(value: unknown) {
    const message = this.valueParser(value)
    this.render(message, 'error')
  }

  render(message: string, type: 'log' | 'verbose' | 'warn' | 'error') {
    const timestamp = new Date().toISOString()
    const timestampColor = '\x1b[37m'
    const timestampMessage = `${timestampColor}${timestamp}\x1b[0m`

    const typeColorMapper = {
      log: '\x1b[32m',
      verbose: '\x1b[34m',
      warn: '\x1b[33m',
      error: '\x1b[31m',
    }
    const typeColor = typeColorMapper[type]
    const messageMessage = `${typeColor}${message}\x1b[0m`
    const typeMessage = `${typeColor}${type.toUpperCase()}\x1b[0m`
    const eventMessage = `${typeColor}CodeSpark'22 \x1b[0m`

    const nameColor = '\x1b[33m'
    const nameMessage = `${nameColor}[${this.name}]\x1b[0m`

    console.log(
      `${eventMessage} ${timestampMessage} ${typeMessage} ${nameMessage} ${messageMessage} `,
    )
  }
}
