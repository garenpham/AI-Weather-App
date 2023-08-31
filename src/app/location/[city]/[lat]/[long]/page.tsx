import { getClient } from '@/apollo-client'
import CalloutCard from '@/components/CalloutCard'
import HumidityChart from '@/components/HumidityChart'
import InformationPanel from '@/components/InformationPanel'
import RainChart from '@/components/RainChart'
import StatCard from '@/components/StatCard'
import TempChart from '@/components/TempChart'
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQueries'
// import cleanData from '@/lib/cleanData'
// import getBasePath from '@/lib/getBasePath'
import React from 'react'

export const revalidate = 1440

type Props = {
  params: {
    city: string
    lat: string
    long: string
  }
}

async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient()
  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: true,
      longitude: long,
      latitude: lat,
      timezone: 'GMT',
    },
  })

  const results: Root = data.myQuery

  // const dataToSend = cleanData(results, city)

  // const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     weatherData: dataToSend,
  //   }),
  // })

  // const GPTdata = await res.json()
  // const { content } = GPTdata

  return (
    <div className='flex flex-col min-h-screen md:flex-row'>
      <InformationPanel city={city} lat={lat} results={results} long={long} />
      <div className='flex-1 p-5 lg:p-10'>
        <div className='p-5'>
          <div className='pb-5'>
            <h2 className='text-xl font-bold'>Today&apos;s Overview</h2>
            <p className='text-sm text-gray-400'>
              Last updated at:{' '}
              {new Date(results.current_weather.time).toLocaleString()} (
              {results.timezone})
            </p>
          </div>
          <div className='m-2 mb-10'>
            <CalloutCard
              message={
                "Good morning, Burnaby! I'm Garen, and I'm coming to you LIVE from the AI Weather Forecast. Get ready for a quick summary of today's weather in your city. Currently, the temperature is 13.5 degrees Celsius with a gentle breeze blowing at 1.1 kilometers per hour from the south. We're experiencing Weather Code 3, which means it's partly cloudy out there. Now, let's dive into the hourly forecast. Throughout the day, temperatures will range from a high of 20.3 degrees Celsius to a low of 13.1 degrees Celsius. We won't be seeing any snowfall, so no need to worry about grabbing your snow gear just yet. As for rain, we can expect a slight drizzle of 0.6 millimeters around 3 PM. Humidity levels will fluctuate throughout the day, starting at 66% and reaching a peak of 100% in the evening. So, be prepared for a little moisture in the air. But here's something important I want to highlight: the UV index. It's crucial to protect yourself from the sun's rays. Today's UV index will be moderate, reaching a peak of 5.35. So, make sure to wear sunscreen, put on a hat, and seek shade during peak hours to keep yourself safe. And now, for a little weather-related joke to brighten your day: Why did the scarecrow win an award? Because he was outstanding in his field! That's all for now, Burnaby! Stay tuned for more updates throughout the day. Stay safe, stay prepared, and remember to bring your umbrella just in case. This has been Garen reporting LIVE from the AI Weather Forecast. Back to you!"
              }
            />
          </div>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 m-2'>
            <StatCard
              title='Maximum Temperature'
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°C`}
              color='yellow'
            />
            <StatCard
              title='Minimum Temperature'
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°C`}
              color='green'
            />

            <div>
              <StatCard
                title='UV Index'
                metric={`${results.daily.uv_index_max[0].toFixed(1)}`}
                color='rose'
              />

              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message='The UV is high today, be sure to wear SPF!'
                  warning
                />
              )}
            </div>

            <div className='flex space-x-3'>
              <StatCard
                title='Wind Speed'
                metric={`${results.current_weather.windspeed.toFixed(1)}m/s`}
                color='cyan'
              />
              <StatCard
                title='Wind Direction'
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color='violet'
              />
            </div>
          </div>
          <hr className='mb-5' />
          <div className={`space-y-3`}>
            <TempChart results={results} />
            <RainChart results={results} />
            <HumidityChart results={results} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
