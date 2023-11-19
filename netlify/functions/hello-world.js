import { Context } from '@netlify/functions'

export default async function handler() {
  return {
    statusCode: 200,
    body: 'Hello world!',
  }
}
