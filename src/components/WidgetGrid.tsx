import { useContext } from 'react'
import { cityContext } from '../utils/cityContext'
import { City } from '../utils/geoDb'
import Card from './Card'

function WidgetGrid() {
  const city: City | undefined = useContext(cityContext)

  if (city) {
    return (
      <>
        <h1 className="text-xl font-bold text-gray-900 mb-3">
          Emplacement : {city.name}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Weather">
            <div>test: test</div>
            <div>test: test</div>
            <div>test: test</div>
            <div>test: test</div>
          </Card>
          <Card title="Google maps">
            <iframe
              title="map"
              width="100%"
              height="200"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                city.name
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            />
          </Card>
        </div>
      </>
    )
  } else {
    return <div>test</div>
  }
}

export default WidgetGrid
