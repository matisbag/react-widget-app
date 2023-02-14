import { createContext } from 'react'
import { City } from './geoDb'

export const cityContext = createContext<City | null>(null)
