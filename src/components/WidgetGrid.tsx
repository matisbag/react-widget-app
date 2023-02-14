import { useContext } from 'react'
import { cityContext } from '../utils/cityContext'
import { City } from '../utils/geoDb'

function WidgetGrid() {
  const city: City | null = useContext(cityContext)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* <h2>Ville : {city.name}</h2> */}
      <section className="rounded-md border border-gray-100 bg-gray-50 p-3">
        <h2>Weather</h2>
        <div>test: test</div>
        <div>test: test</div>
        <div>test: test</div>
        <div>test: test</div>
      </section>
      <section className="rounded-md border border-gray-100 bg-gray-50 p-3">
        <h2>Weather</h2>
        <div className="pa-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d11050.261470957426!2d6.127334!3d46.179307!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1676387167788!5m2!1sfr!2sfr"
            width="600"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  )
}

export default WidgetGrid
