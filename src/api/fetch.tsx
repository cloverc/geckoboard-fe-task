export type GaugeData = {
  min: number
  value: number
  max: number
  format?: string
  unit?: string
}

export const fetchGaugeData = async (): Promise<GaugeData> => {
  const response = await fetch(
    `https://widgister.herokuapp.com/challenge/frontend`
  )
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response.json()
}
