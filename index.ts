import { bootstrap as cqrsBootsrap } from './cqrs'
import { bootstrap as dddBootstrap } from './ddd'

// read argv values
const [, , ...args] = process.argv

if (args.length === 0) {
  console.log('Please provide an argument: cqrs or ddd')
  process.exit(1)
}

const [arg] = args

if (arg === 'cqrs') {
  cqrsBootsrap()
}

if (arg === 'ddd') {
  dddBootstrap()
}
