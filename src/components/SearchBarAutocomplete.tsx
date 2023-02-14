import { useEffect, useState } from 'react'
import { useDebounce } from '../utils/useDebounce'

declare const process: {
  env: {
    REACT_APP_RAPID_API_KEY: string
  }
}

function SearchBarAutocomplete() {
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
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

      setLoading(true)

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
          setLoading(false)
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
      <div className="flex items-center relative">
        <input
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          type="text"
          className="flex-1 px-3 py-1.5 min-w-0 text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Search"
        />
        {loading && (
          <svg
            className="absolute right-2.5 bottom-2.5 animate-spin ml-3 h-5 w-5 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </div>
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
