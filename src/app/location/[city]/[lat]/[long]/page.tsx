import CalloutCard from '@/components/CalloutCard'
import HumidityChart from '@/components/HumidityChart'
import InformationPanel from '@/components/InformationPanel'
import RainChart from '@/components/RainChart'
import StatCard from '@/components/StatCard'
import TempChart from '@/components/TempChart'
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQueries'
import { getClient } from '@/helpers/apollo-client'
import cleanData from '@/lib/cleanData'
import getBasePath from '@/lib/getBasePath'
import React from 'react'

export const revalidate = 0

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

  const dataToSend = cleanData(results, city)

  let content: string

  try {
    const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        weatherData: dataToSend,
      }),
    })

    const GPTdata = await res.json()
    // const { content } = GPTdata
    content = GPTdata.content
  } catch (error) {
    console.log(error)
    content =
      "Good morning, everyone! This is Garen, coming to you LIVE from the AI Weather Forecast. Today, we have an exciting summary of the weather in Burnaby! Currently, we have a temperature of 13.1°C with a gentle breeze blowing at 4.4 km/h from the southwest. You might want to grab a light jacket before heading out. Now, let's dive into the hourly weather for today. The temperatures will range from a pleasant 20.3°C during the afternoon to 13.1°C in the evening. So, it's going to be a day of mild temperatures, perfect for outdoor activities! Here's a little joke to brighten up your day: Why did the weather go to therapy? Because it had too many highs and lows! But wait, there's more! We have a low chance of rain throughout the day, with just a spritz of 0.6 mm expected in the afternoon. So, no need to worry about carrying an umbrella. However, the relative humidity will be on the higher side, peaking at 100% in the morning. So, you might want to keep an eye on your hair if you're stepping out early. Now, let's talk about the UV index. It's important to protect your skin from harmful rays! Today, the UV index will start off at a moderate level of 3.1 in the morning. As the day progresses, it will reach its peak at 5.35 in the afternoon. Make sure to apply sunscreen, wear sunglasses, and seek shade when necessary to keep your skin safe and glowing! That's it for your weather summary, Burnaby! Remember to dress accordingly, enjoy your day, and stay weather-wise. Back to you in the studio!"
  }

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
            <CalloutCard message={content} />
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
