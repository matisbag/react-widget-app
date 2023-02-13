import { useState } from "react";

type Props = {
  value: string
  onSearchUpdate: (value: string) => void
}

function SearchBarAutocomplete({ value, onSearchUpdate }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (value: string) => {
    setInputValue(value);
  
    const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?q=${value}`, {
      headers: {
        'X-RapidAPI-Key': 'd78835dde4mshea041f1f10b7fb6p115506jsnda0bf3b877d1',
      }
    });
    const data = await response.json();
  
    // setSuggestions(data.suggestions);
  };

  return (
    <div className="flex flex-wrap w-full mb-4">
      <input
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        type="search"
        className="flex-1 px-3 py-1.5 min-w-0 text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Search"
      />
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion}>{suggestion}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchBarAutocomplete
