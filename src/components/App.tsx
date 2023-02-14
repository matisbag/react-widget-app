import { useState } from 'react'
import SearchBarAutocomplete from './SearchBarAutocomplete'
import WidgetGrid from './WidgetGrid'
import '../style/App.css'
import { City } from '../utils/geoDb'
import { cityContext } from '../utils/cityContext'

function App() {
  const [city, setCity] = useState<City | null>(null)

  return (
    <main>
      <SearchBarAutocomplete onCityUpdate={(e) => setCity(e)} />
      <cityContext.Provider value={city}>
        <WidgetGrid />
      </cityContext.Provider>
    </main>
  )
}

export default App
