import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import App from '../src/App'
import * as React from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})
const wrapper = (ui: React.ReactElement) => (
  <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
)

describe('App', () => {
  it('renders Gauge component', async () => {
    const result = render(wrapper(<App />))

    expect(await result.findByText(/Format:/i)).toBeInTheDocument()
  })
})
