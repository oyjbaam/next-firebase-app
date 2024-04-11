import React from 'react'
import MovieGrid from './movieGrid'
import { fetcher } from '@/util/fetcher'
import { MovieType } from '@/types/movieType'
import Pagination from '@/app/components/common/pagination'
interface MovieSlugPageProps {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const MovieSlugPage = async ({ params, searchParams }: MovieSlugPageProps) => {
  const page = searchParams.page ?? '1'
  const movieUrl = `/movie/${params['movie-slug']}?page=${page}`
  const data: MovieType = await fetcher(movieUrl, 'get')
  const totalPages =
    data.total_pages > 40
      ? Array.from({ length: 40 }, (_, index) => index + 1)
      : Array.from({ length: data.total_pages }, (_, index) => index + 1)
  return (
    <div className="flex w-full flex-col justify-center gap-5">
      <MovieGrid datas={data.results} />
      <Pagination page={page} totalPages={totalPages} params={params} />
    </div>
  )
}

export default MovieSlugPage
