import { useEffect, useState } from 'react'
import { useDebounce } from '../utils/useDebounce'

declare const process: {
  env: {
    REACT_APP_RAPID_API_KEY: string
  }
}

function SearchBarAutocomplete() {
  const [value, setValue] = useState<string>('')
  const [results, setResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState<boolean>(false) // TODO: Typer dans un fichier utils
  const [clicked, setClicked] = useState(false)
  const debouncedValue = useDebounce<string>(value, 1000) // 1 second because of free API

  const handleInputChange = (value: string) => {
    setValue(value)
    setClicked(false)
  }

  const handleResultClick = (result: any) => {
    // TODO: set global variable with values
    setClicked(true)
    setValue(result.name)
    setShowResults(false)
  }

  useEffect(() => {
    if (debouncedValue && !clicked) {
      const API_KEY: string = process.env.REACT_APP_RAPID_API_KEY
      // Faire un fichier utils ?

      fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${debouncedValue}&minPopulation=20000&types=City`,
        {
          headers: {
            'X-RapidAPI-Key': API_KEY,
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          throw new Error('Something went wrong')
        })
        .then((res) => {
          setResults(res.data)
          setShowResults(true)
          console.log(res.data)
        })
      // TODO: gérer les erreurs
    } else {
      setShowResults(false)
      setResults([])
    }
  }, [debouncedValue, clicked])

  return (
    <div className="flex flex-col w-full mb-4">
      <input
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        type="search"
        className="flex-1 px-3 py-1.5 min-w-0 text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Search"
      />
      {showResults && (
        <ul className="w-full bg-white border shadow-sm rounded">
          {results.map((result) => (
            <li
              key={result.id + result.type}
              className="p-2 border-b-[1px] border-solid hover:bg-gray-200"
              onClick={() => handleResultClick(result)}
            >
              {result.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBarAutocomplete
