import Grid from '@/components/common/grid'
import Link from 'next/link'
import Card from '@/components/common/Card'
import Pagination from '@/components/common/pagination'
import { notFound } from 'next/navigation'
import React from 'react'
import { combineChannelAndPath } from '@/shared/util/combineChannelAndPath'
import { getMovieTvList } from '@/shared/api/tmdbAPI'
import { PATH_NAME } from '@/app/constants'
import { ChannelType, PathType } from '@/shared/types/channel'
import { getDiscoverList } from '@/shared/api/tmdbFilterListApi'
import DontHaveData from './_components/DontHaveData'
import { ListResponseType } from '@/shared/types'
type CardListSectionProps = {
  params: Record<string, [ChannelType, PathType]>
  searchParams: Record<string, string | string[] | undefined>
}

const CardListSection = async ({ params, searchParams }: CardListSectionProps) => {
  const [channel, path] = params.channel
  const page = (searchParams.page || '1') as string
  const query = (searchParams.query || '') as string
  const genre = searchParams.with_genres || ''
  const startDate = searchParams['primary_release_date.gte'] || ''
  const endDate = searchParams['primary_release_date.lte'] || ''
  if (!(path in PATH_NAME) || !path) notFound()
  const fetchUrl = combineChannelAndPath(channel, path, query)

  const parameters = query ? `query=${query}&page=${page}` : `page=${page}`
  const discoverPrams = `with_genres=${genre}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&page=${page}`

  let fetchResult: ListResponseType
  if (channel === 'discover') {
    const pathParameter = path === 'movie' || path === 'tv' ? path : 'movie'
    fetchResult = await getDiscoverList(pathParameter, discoverPrams)
  } else {
    fetchResult = await getMovieTvList(`${fetchUrl}?${parameters}`)
  }

  const totalPages =
    fetchResult.total_pages > 40
      ? Array.from({ length: 40 }, (_, index) => index + 1)
      : Array.from({ length: fetchResult.total_pages }, (_, index) => index + 1)

  return (
    <>
      {fetchResult.results.length > 0 ? (
        <Grid>
          {fetchResult.results.map((data, idx) => {
            const mediaType = data.media_type ? data.media_type : channel === 'discover' ? path : channel
            return (
              <Link href={`/detail?mediaType=${mediaType}&id=${data.id}`} key={data.id + idx}>
                <Card data={data} />
              </Link>
            )
          })}
        </Grid>
      ) : (
        <DontHaveData />
      )}
      <Pagination page={page} totalPages={totalPages} query={query} />
    </>
  )
}

export default CardListSection
