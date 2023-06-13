interface GetArcPropsParams {
  centerPoint: { x: number; y: number }
  chartRadius: number
  startAngle: number
  endAngle: number
}

const convertToRadian = (degrees: number) => {
  return (degrees * Math.PI) / 180
}

export const drawArcSvg = ({
  centerPoint,
  chartRadius,
  startAngle,
  endAngle,
}: GetArcPropsParams) => {
  const firstX =
    -chartRadius * Math.cos(convertToRadian(startAngle)) + centerPoint.x
  const firstY =
    -chartRadius * Math.sin(convertToRadian(startAngle)) + centerPoint.y

  const endX =
    -chartRadius * Math.cos(convertToRadian(endAngle)) + centerPoint.x
  const endY =
    -chartRadius * Math.sin(convertToRadian(endAngle)) + centerPoint.y

  const largeArcFlag = endAngle - startAngle < 180 ? '0' : '1'

  const path = [
    'M',
    firstX - 0.001,
    firstY,
    'A',
    chartRadius + 0,
    chartRadius + 0,
    0,
    largeArcFlag,
    1,
    endX,
    endY,
  ].join(' ')
  return path
}
