import { useState } from 'react';
import SearchBarAutocomplete from './SearchBarAutocomplete'
import '../style/App.css';

function App() {
  const [search, setSearch] = useState<string>('')

  return (
    <main>
      <SearchBarAutocomplete value={search} onSearchUpdate={(e) => setSearch(e)} />
    </main>
  );
}

export default App;
