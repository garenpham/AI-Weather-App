import { globalStyles } from '@/constants/globalStyles'
import { SunIcon } from '@heroicons/react/24/solid'
import React from 'react'

type Props = {}

function Loading({}: Props) {
  return (
    <div
      className={`${globalStyles.colors.primary} min-h-screen flex flex-col items-center justify-center text-slate-500`}>
      <SunIcon
        className='w-24 h-24 animate-bounce text-yellow-500'
        color='yellow'
      />
      <h1 className={`text-6xl font-bold text-center mb-10 animate-pulse`}>
        Loading City Weather Information
      </h1>
      <h2 className={`text-xl font-bold text-center mb-10 animate-pulse`}>
        Hold on, we are crunching the numbers & generating an AI summary of the
        Weather!
      </h2>
    </div>
  )
}

export default Loading
