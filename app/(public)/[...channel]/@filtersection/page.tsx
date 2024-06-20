import React from 'react'
import { ChannelType, PathType } from '@/shared/types/channel'
import SelectGenre from './_components/SelectGenre'
import SelectDate from './_components/SelectDate'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ChevronDown } from 'lucide-react'
import FlexBox from '@/components/ui/FlexBox'
import CalendarProvider from '@/shared/context/calendarProvider'
import { getGenreList } from '@/shared/api/tmdbFilterListApi'
import FilterSubmitButton from './_components/FilterSubmitButton'

type FilterSectionProps = {
  params: Record<string, [ChannelType, PathType]>
  searchParams: Record<string, string | string[] | undefined>
}

const FilterSection = async ({ params, searchParams }: FilterSectionProps) => {
  const [channel, path] = params.channel

  if (channel === 'search') {
    return null
  }

  const pathParameter = path === 'movie' || path === 'tv' ? path : 'movie'
  const genListParameter = channel !== 'discover' ? channel : pathParameter

  const res = await getGenreList(genListParameter)

  return (
    <section className="space-y-3 mb-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-0">
          <AccordionTrigger>
            <FlexBox alignItems="center" className="gap-2">
              <h2 className="text-base">필터</h2>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </FlexBox>
          </AccordionTrigger>
          <AccordionContent className="p-1 space-y-3">
            <CalendarProvider>
              <SelectGenre data={res.genres} searchParams={searchParams} />
              <SelectDate />
              <FilterSubmitButton genListParameter={genListParameter} />
            </CalendarProvider>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

export default FilterSection
