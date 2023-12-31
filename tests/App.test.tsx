import { rest } from 'msw'
import { renderWithClient } from './utils'
import { server } from './setup'
import App from '../src/App'

describe('App', () => {
  test('successful Gauge component', async () => {
    const result = renderWithClient(<App />)

    expect(await result.findByText(/34/i)).toBeInTheDocument()
  })

  test('handles server error', async () => {
    server.use(
      rest.get('*/frontend', (_req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    const result = renderWithClient(<App />)

    expect(
      await result.findByText(/Oops! An error has occurred/i)
    ).toBeInTheDocument()
  })
})
