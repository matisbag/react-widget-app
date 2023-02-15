import { useEffect, useState } from 'react'
import { useDebounce } from '../utils/useDebounce'
import { GEO_DB_BASE_URL, GEO_DB_KEY, City } from '../utils/geoDb'

type Props = {
  onCityUpdate: (value: City) => void
}

function SearchBarAutocomplete({ onCityUpdate }: Props) {
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [results, setResults] = useState<City[]>([])
  const [showResults, setShowResults] = useState<boolean>(false)
  const [clicked, setClicked] = useState(false)
  const debouncedValue = useDebounce<string>(value, 1000) // 1 second because of free API

  const handleInputChange = (value: string) => {
    setValue(value)
    setClicked(false)
  }

  const handleResultClick = (result: City) => {
    onCityUpdate(result)
    setClicked(true)
    setValue(result.name)
    setShowResults(false)
  }

  useEffect(() => {
    if (debouncedValue && !clicked) {
      setLoading(true)

      fetch(
        `${GEO_DB_BASE_URL}?namePrefix=${debouncedValue}&minPopulation=20000&types=City`,
        {
          headers: {
            'X-RapidAPI-Key': GEO_DB_KEY,
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          throw new Error('Something went wrong')
        })
        .then(
          (data) => {
            setResults(data.data)
            setShowResults(true)
            setLoading(false)
          },
          (error) => {
            console.log(error.message)
          }
        )
    } else {
      setShowResults(false)
      setResults([])
    }
  }, [debouncedValue])

  return (
    <div className="flex flex-col w-full mb-10 relative">
      <div className="flex items-center">
        <input
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          type="text"
          className="flex-1 px-3 py-1.5 min-w-0 text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Search city"
        />
        {loading && (
          <img
            src="/circle-loading.svg"
            alt="React Logo"
            className="absolute right-2.5 bottom-2.5 animate-spin ml-3 h-5 w-5"
          />
        )}
      </div>
      {showResults && (
        <ul className="absolute z-10 mt-9 w-full bg-white border shadow-sm rounded">
          {results.map((result) => (
            <li
              key={result.id + result.type}
              className="p-2 border-b-[1px] border-solid hover:bg-gray-200"
              onClick={() => handleResultClick(result)}
            >
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBarAutocomplete
