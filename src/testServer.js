import { rest } from 'msw'
import { setupServer } from 'msw/node'

const data = require('./response.json')

const server = setupServer(
  rest.get(
    'https://api.openweathermap.org/data/2.5/forecast',
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(data))
    }
  ),
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`)
    return res(
      ctx.status(500),
      ctx.json({ error: 'You must add request handler.' })
    )
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

export { server, rest }
