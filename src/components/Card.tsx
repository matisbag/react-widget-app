import { ReactNode } from 'react'

interface Props {
  title?: string
  children: ReactNode
  loading?: boolean
  widgetIndex?: number
  onRemoveClick?: (widgetIndex: number) => void
}

function Card({
  title,
  children,
  loading = false,
  widgetIndex,
  onRemoveClick,
}: Props) {
  return (
    <section className="rounded-md border border-gray-100 hover:border-blue-200 bg-gray-50 p-3 ease-in duration-100">
      {title && (
        <div className="flex justify-between">
          <h2 className="text-lg font-medium mb-3">{title}</h2>
          <img
            src="/add.svg"
            alt="add"
            className="h-8 w-8 p-1 cursor-pointer	rotate-45 rounded-full ease-in-out hover:bg-red-200"
            onClick={() => onRemoveClick?.(widgetIndex || 1)}
          />
        </div>
      )}
      {loading ? (
        <div className="min-h-[100px] flex justify-center items-center medium">
          <img
            src="/circle-loading.svg"
            alt="React Logo"
            className="animate-spin mr-3 h-5 w-5"
          />
          Loading...
        </div>
      ) : (
        <div className="pa-2">{children}</div>
      )}
    </section>
  )
}

export default Card
