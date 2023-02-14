import { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
}

function Card({ title, children }: Props) {
  return (
    <section className="rounded-md border border-gray-100 hover:border-blue-200 bg-gray-50 p-3 ease-in duration-100">
      <h2 className="text-lg font-medium mb-3">{title}</h2>
      <div className="pa-2">{children}</div>
    </section>
  )
}

export default Card
