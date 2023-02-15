import { ReactNode } from 'react'

interface Props {
  title?: string
  children: ReactNode
  loading?: boolean
}

function Card({ title, children, loading = false }: Props) {
  return (
    <section className="rounded-md border border-gray-100 hover:border-blue-200 bg-gray-50 p-3 ease-in duration-100">
      {title && <h2 className="text-lg font-medium mb-3">{title}</h2>}
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
