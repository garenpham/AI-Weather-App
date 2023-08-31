'use client'

import CityPicker from '@/components/CityPicker'
import { globalStyles } from '@/constants/globalStyles'
import { Card, Divider, Subtitle, Text } from '@tremor/react'
import Link from 'next/link'

export default function Home() {
  return (
    <div
      className={`min-h-screen p-10 flex flex-col justify-center items-center bg-gradient-to-br from-[#394f68] to-[#183B7E]`}>
      <div className={`max-w-4xl mx-auto`}>
        <Card className=''>
          <Text className='!text-6xl font-bold text-center mb-10'>
            Weather AI
          </Text>
          <Subtitle className='text-xl text-center'>
            Powered by OpenAI, Next.js 13, Tailwind CSS, Tremor v2.11 + More!
          </Subtitle>

          <Divider className='my-10' />

          <Card className={globalStyles.colors.primary}>
            <CityPicker />
          </Card>
        </Card>
        <div className='mt-[1rem] flex justify-end'>
          <Link
            href='https://github.com/garenpham/'
            target='_blank'
            className='group cursor-pointer text-gray-400 hover:text-white'>
            By: Garen Pham{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
