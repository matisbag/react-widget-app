import { useContext, useEffect, useState } from 'react'
import { cityContext } from '../utils/cityContext'
import { WEATHER_BASE_URL, WEATHER_KEY, WeatherData } from '../utils/weather'
import { City } from '../utils/geoDb'
import Card from './Card'

interface Props {
  onRemoveClick: (widgetIndex: number) => void
}

function Weather({ onRemoveClick }: Props) {
  const city: City | undefined = useContext(cityContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState<WeatherData | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(
      `${WEATHER_BASE_URL}/current.json?q=${city?.latitude},${city?.longitude}&key=${WEATHER_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [city])

  return (
    <Card
      title="Weather"
      loading={loading}
      widgetIndex={1}
      onRemoveClick={(e) => onRemoveClick(e)}
    >
      {error && <div>Error: {error}</div>}
      {data && (
        <>
          <div className="flex flex-col items-center bg-white rounded-md shadow-sm p-2">
            <img
              src={data.current.condition.icon}
              alt="Weather icon"
              className="w-20 mb-4"
            />
            <div className="text-center">
              <p className="text-gray-700 text-xl font-medium">
                {data.current.condition.text}
              </p>
              <p className="text-gray-500 text-lg font-medium">
                {data.current.temp_c}°C
              </p>
            </div>
          </div>
          <p className="text-center italic text-xs">
            Last update : {data.current.last_updated.toLocaleString()}
          </p>
        </>
      )}
    </Card>
  )
}

export default Weather
