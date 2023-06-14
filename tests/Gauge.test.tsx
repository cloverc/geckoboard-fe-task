import { rest } from 'msw'
import { server } from './setup'
import { renderWithClient } from './utils'
import Gauge from '../src/components/Gauge'

describe('Gauge', () => {
  test('loads gauge', async () => {
    const result = renderWithClient(<Gauge />)

    const gauge = await result.findByRole('meter')
    expect(gauge).toBeInTheDocument()
  })

  test('should render current, min and max values', async () => {
    server.use(
      rest.get('*/frontend', (_req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            value: 99,
            min: 0,
            max: 200,
            format: 'currency',
            unit: 'GBP',
          })
        )
      })
    )

    const result = renderWithClient(<Gauge />)

    const currentValue = await result.findByTitle('value')
    const minValue = await result.findByTestId('min-value')
    const maxValue = await result.findByTestId('max-value')

    expect(currentValue).toHaveTextContent(/£99/i)
    expect(minValue).toHaveTextContent(/£0/i)
    expect(maxValue).toHaveTextContent(/£200/i)
  })

  test('Should render the gauge needle', async () => {
    const result = renderWithClient(<Gauge />)

    const needle = await result.findByRole('needle')
    expect(needle).toBeInTheDocument()
  })
})
