import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Weather Forecast',
  description: 'A Weather Application utilizing AI as the announcer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='icon'
          href='https://res.cloudinary.com/dli8bhz3z/image/upload/v1693483994/pic1_p8yotp.svg'
          sizes='any'
        />
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  )
}
