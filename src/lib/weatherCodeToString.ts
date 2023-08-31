const weatherCodeToString: {
  [key: number]: {
    icon: string
    label: string
  }
} = {
  0: {
    icon: 'c01d',
    label: 'Clear sky',
  },
  1: {
    icon: 'c02d',
    label: 'Mainly clear',
  },
  2: {
    icon: 'c03d',
    label: 'Partly cloudy',
  },
  3: {
    icon: 'c04d',
    label: 'Overcast',
  },
  45: {
    icon: 'a05d',
    label: 'Fog',
  },
  48: {
    icon: 's05d',
    label: 'Depositing rime fog',
  },
  51: {
    icon: 'd01d',
    label: 'Light Drizzle',
  },
  53: {
    icon: 'd02d',
    label: 'Moderate Drizzle',
  },
  55: {
    icon: 'd03d',
    label: 'Dense Drizzle',
  },
  56: {
    icon: 'd01d',
    label: 'Light Freezing Drizzle',
  },
  57: {
    icon: 'd03d',
    label: 'Dense Freezing Drizzle',
  },
  61: {
    icon: 'r01d',
    label: 'Light Rain',
  },
  63: {
    icon: 'r02d',
    label: 'Moderate Rain',
  },
  65: {
    icon: 'r03d',
    label: 'Heavy Rain',
  },
  66: {
    icon: 'f01d',
    label: 'Light Freezing Rain',
  },
  67: {
    icon: 'r03d',
    label: 'Heavy Freezing Rain',
  },
  71: {
    icon: 's01d',
    label: 'Light snow fall',
  },
  73: {
    icon: 's02d',
    label: 'Snow fall',
  },
  75: {
    icon: 's03d',
    label: 'Heavy snow fall',
  },
  77: {
    icon: 's02d',
    label: 'Snow grains',
  },
  80: {
    icon: 'r04d',
    label: 'Light shower rain',
  },
  81: {
    icon: 'r05d',
    label: 'Shower rain',
  },
  82: {
    icon: 'r06d',
    label: 'Heavy shower rain',
  },
  85: {
    icon: 's01d',
    label: 'Snow shower',
  },
  86: {
    icon: 's02d',
    label: 'Heavy snow shower',
  },
  95: {
    icon: 't03d',
    label: 'Thunderstorm',
  },
  96: {
    icon: 't04d',
    label: 'Thunderstorm with slight hail',
  },
  99: {
    icon: 't05d',
    label: 'Thunderstorm with heavy hail',
  },
}

export default weatherCodeToString
