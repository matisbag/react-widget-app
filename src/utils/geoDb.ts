// https://rapidapi.com/wirefreethought/api/geodb-cities

declare const process: {
  env: {
    REACT_APP_RAPID_API_KEY: string
  }
}

export const GEO_DB_BASE_URL: string =
  'https://wft-geo-db.p.rapidapi.com/v1/geo/cities'

export const GEO_DB_KEY: string = process.env.REACT_APP_RAPID_API_KEY

type MetaData = {
  currentOffset: number
  totalCount: number
}

type Link = {
  href: string
  rel: string
}

export type City = {
  id: number
  wikiDataId: string
  type: string
  city: string
  name: string
  country: string
  countryCode: string
  region: string
  regionCode: string
  latitude: number
  longitude: number
  population: number
}

export type CitiesResponse = {
  data: City[]
  links: Link[]
  metadata: MetaData
}
