'use client'

import { GlobeAmericasIcon } from '@heroicons/react/24/solid'
import { City, Country } from 'country-state-city'
import { useRouter } from 'next/navigation'
import React from 'react'
import Select from 'react-select'

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}))

type option = {
  country: {
    value: {
      latitude: string
      longitude: string
      isoCode: string
    }
    label: string
  } | null
  city: {
    value: {
      latitude: string
      longitude: string
      countryCode: string
      name: string
      stateCode: string
    }
    label: string
  } | null
}

type Props = {}

const CityPicker = (props: Props) => {
  const [selectedCountry, setSelectedCountry] =
    React.useState<option['country']>(null)
  const [selectedCity, setSelectedCity] = React.useState<option['city']>(null)
  const router = useRouter()

  const handleSelectedCountry = (option: option['country']) => {
    setSelectedCountry(option)
    setSelectedCity(null)
  }

  const handleSelectedCity = (option: option['city']) => {
    setSelectedCity(option)
    router.push(
      `/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
    )
  }

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center space-x-2 text-white/80'>
          <GlobeAmericasIcon className='text-white h-5 w-5' />
          <label htmlFor='country'>Country</label>
        </div>
        <Select
          className='text-black'
          instanceId='country'
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={options}
        />
      </div>

      {selectedCountry && (
        <div className='space-y-2'>
          <div className='flex items-center space-x-2 text-white/80'>
            <GlobeAmericasIcon className='text-white h-5 w-5' />
            <label htmlFor='city'>City</label>
          </div>
          <Select
            className='text-black'
            instanceId='city'
            value={selectedCity}
            onChange={handleSelectedCity}
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((state) => ({
              value: {
                latitude: state.latitude!,
                longitude: state.longitude!,
                countryCode: state.countryCode,
                name: state.name,
                stateCode: state.stateCode,
              },
              label: state.name,
            }))}
          />
        </div>
      )}
    </div>
  )
}

export default CityPicker
