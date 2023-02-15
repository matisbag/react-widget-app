import { useContext } from 'react'
import { cityContext } from '../utils/cityContext'
import { City } from '../utils/geoDb'
import AddWidget from './AddWidget'
import Card from './Card'
import Weather from './Weather'

function WidgetGrid() {
  const city: City | undefined = useContext(cityContext)

  if (city) {
    return (
      <>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Location : {city.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Weather />
          <Card title="Google maps">
            <iframe
              title="map"
              width="100%"
              height="200"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                city.latitude + ',' + city.longitude
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            />
          </Card>
          <AddWidget />
        </div>
      </>
    )
  } else {
    return <div></div>
  }
}

export default WidgetGrid
