import Card from './Card'

interface Props {
  activeWidgets: number[]
  onActiveWidgetsUpdate: (widgetsIndex: number[]) => void
}

function addWidget({ activeWidgets, onActiveWidgetsUpdate }: Props) {
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
            className={
              'p-2 flex items-center rounded border border-gray-100 ' +
              (!activeWidgets.includes(choice.id)
                ? 'cursor-pointer bg-white hover:bg-gray-50 hover:border-gray-200'
                : 'bg-gray-200')
            }
            onClick={
              !activeWidgets.includes(choice.id)
                ? () => onActiveWidgetsUpdate([...activeWidgets, choice.id])
                : undefined
            }
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
