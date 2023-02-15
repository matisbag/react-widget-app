import { useState } from 'react'
import SearchBarAutocomplete from './SearchBarAutocomplete'
import WidgetGrid from './WidgetGrid'
import '../style/App.css'
import { City } from '../utils/geoDb'
import { cityContext } from '../utils/cityContext'

function App() {
  const [city, setCity] = useState<City | undefined>(undefined)

  return (
    <main className="flex flex-col justify-center">
      <h1 className="text-3xl font-medium mb-6">Widgets App</h1>
      <SearchBarAutocomplete onCityUpdate={(e) => setCity(e)} />
      <cityContext.Provider value={city}>
        <WidgetGrid />
      </cityContext.Provider>
    </main>
  )
}

export default App
