'use client'

import { AreaChart, Card, Title } from '@tremor/react'
import React from 'react'

type Props = {
  results: Root
}

function TempChart({ results }: Props) {
  const hourly = results.hourly.time
    .map((time) =>
      new Date(time).toLocaleString('en-GB', {
        hour: 'numeric',
        hour12: false,
      })
    )
    .slice(0, 24)
  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    'UV Index': results.hourly.uv_index[i],
    'Temperature (C)': results.hourly.temperature_2m[i],
  }))

  return (
    <Card>
      <Title>Temperature & UV Index</Title>
      <AreaChart
        className='mt-6'
        data={data}
        showLegend
        index='time'
        categories={['UV Index', 'Temperature (C)']}
        colors={['rose', 'yellow']}
        minValue={0}
        yAxisWidth={40}
      />
    </Card>
  )
}

export default TempChart
