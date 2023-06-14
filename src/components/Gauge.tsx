import { fetchGaugeData } from '../api/fetch'
import { useQuery } from '@tanstack/react-query'
import { drawArcSvg } from '../utils/utils'
import './Gauge.css'

const Gauge = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['gaugeData'],
    queryFn: fetchGaugeData,
  })

  if (isLoading) return <span>Loading...</span>

  if (error instanceof Error)
    return (
      <span className="error-message">
        Oops! An error has occurred: {error.message} {''}
        <p>Please try again</p>
      </span>
    )

  const { max = 200, min = 0, value = 34 } = { ...data }

  const startAngle = 0
  const endAngle = 180

  const width = 400
  const centerPoint = { x: width / 2, y: width / 2 }
  const chartRadius = width / 2 - (width / 2) * 0.2

  const valueToAngle = (value: number) => {
    const angleRange = endAngle - startAngle
    const valueRange = max - min
    const angle = startAngle + ((value - min) / valueRange) * angleRange
    return Math.round(angle)
  }

  const minTextX = 20
  const minTextY = width / 2 + 20

  const maxTextX = width - 60
  const maxTextY = width / 2 + 20

  return (
    <>
      <div role="meter">
        <svg
          height={width / 2 + 40}
          width={width}
          view-box={`0 0 ${width / 2} ${width}`}
          role="img"
        >
          <path
            d={drawArcSvg({
              centerPoint,
              chartRadius,
              startAngle,
              endAngle,
            })}
            fill="none"
            strokeWidth="40"
            stroke="#FFC0A9"
          />
          <path
            d={drawArcSvg({
              centerPoint,
              chartRadius,
              startAngle,
              endAngle: valueToAngle(value),
            })}
            fill="none"
            strokeWidth="40"
            stroke="#FF8598"
          />
          <g role="needle">
            <polygon
              className="point"
              points={`${centerPoint.x},${centerPoint.y - 10} ${
                centerPoint.x
              },${centerPoint.y + 10} ${centerPoint.x - 120},${centerPoint.y}`}
              transform={`rotate(${valueToAngle(value)} ${centerPoint.x} ${
                centerPoint.y
              })`}
            />
            <circle cx={centerPoint.x} cy={centerPoint.y} r="14" />
          </g>
          <text x={minTextX} y={minTextY} data-testid="min-value">
            £{min}
          </text>
          <text x={maxTextX} y={maxTextY} data-testid="max-value">
            £{max}
          </text>
        </svg>
        <div>
          <span title="value" className="large-label">
            £{value}
          </span>
        </div>
      </div>
    </>
  )
}

export default Gauge
