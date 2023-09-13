import Image from 'next/image'
import { Inter } from 'next/font/google'
import Hero from '@/components/hero'
import AboutUs from '@/components/about'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Hero/>
      <AboutUs/>
    </>
  )
}
