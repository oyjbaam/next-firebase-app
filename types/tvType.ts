export interface TvShowResults {
  page: number
  results: TvShow[]
  total_pages: number
  total_results: number
}
export interface TvShow {
  adult: boolean
  backdrop_path: string | null
  first_air_date: string
  genre_ids: number[]
  id: number
  media_type: string
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null
  vote_average: number
  vote_count: number
}
