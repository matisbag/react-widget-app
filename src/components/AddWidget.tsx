import Card from './Card'

function addWidget() {
  const choices = [
    {
      id: 1,
      name: 'Weather',
    },
    {
      id: 2,
      name: 'Google Maps',
    },
  ]
  return (
    <Card>
      <ul className="w-full space-y-2">
        {choices.map((choice) => (
          <li
            key={choice.id}
            className="p-2 flex items-center rounded bg-white hover:bg-gray-50 border border-gray-100 hover:border-gray-200"
            // onClick={() => handleResultClick(result)}
          >
            <img src="/add.svg" alt="add" className="h-4 w-4 mr-2" />
            {choice.name}
          </li>
        ))}
      </ul>
    </Card>
  )
}
export default addWidget
