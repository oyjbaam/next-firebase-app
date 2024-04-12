import React from 'react'
import CardSkeleton from '@/app/components/common/cardSkeleton'

const MovieLoading = () => {
  return (
    <div className="grid grid-cols-4 gap-4 justify-items-center">
      <CardSkeleton />
    </div>
  )
}

export default MovieLoading
