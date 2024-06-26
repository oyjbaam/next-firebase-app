import FlexBox from '@/components/ui/FlexBox'

type FilterItemProps = {
  children: React.ReactNode
  title: string
}

const FilterItem = ({ children, title }: FilterItemProps) => {
  return (
    <FlexBox alignItems="center" className="gap-4 min-h-fit">
      <FlexBox className="min-w-16">
        <span className="shrink-0">{title}</span>
      </FlexBox>
      <div className="bg-slate-400 h-10 w-[1px] shrink-0" aria-hidden></div>
      <FlexBox alignItems="center" className="flex-wrap gap-1">
        {children}
      </FlexBox>
    </FlexBox>
  )
}

export default FilterItem
