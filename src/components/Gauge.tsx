import { fetchGaugeData } from '../api/fetch'
import { useQuery } from '@tanstack/react-query'

const Gauge = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['gaugeData'],
    queryFn: fetchGaugeData,
  })

  if (isLoading) return 'Loading...'

  if (error instanceof Error) return 'An error has occurred: ' + error.message

  const { max, min, value, format, unit } = { ...data }

  return (
    <div>
      <p>Value: {value}</p>
      <p>Min: {min}</p>
      <p>Max: {max}</p>
      <p>Format: {format}</p>
      <p>Unit: {unit}</p>
    </div>
  )
}

export default Gauge
