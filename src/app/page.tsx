'use client'

import CarouselCards from '@/app/components/CarouselCards'
import FinalResult from '@/app/components/FinalResult'
import Hero from '@/app/components/hero'
import UploadWidget from '@/app/components/upload'
import ZombieLoader from '@/app/components/ZombieLoader'
import { useResourceContext } from '@/app/context/ResourceContext'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Home() {
	const { loadingResult, finalResult, loadResources } = useResourceContext()

	useEffect(() => {
		loadResources(null)
	}, [])

	return (
		<>
			<section id='hero'>
				<Hero />
			</section>

			<section
				id='join'
				className='bg-gradient-to-br from-dark-purple to-dark-blue-black  flex flex-col justify-center items-center py-8'>
				<UploadWidget text='Join the zombie army' />
				{loadingResult && <ZombieLoader />}
				{finalResult && <FinalResult />}
			</section>

			<section
				id='carousel'
				className='bg-gradient-to-br from-dark-purple to-dark-blue-black flex flex-col justify-center items-center py-8'>
				<div className='w-full max-w-screen-lg flex justify-between items-center px-4'>
					<h2 className='bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 font-zombieFont tracking-wide py-2 font-normal text-3xl'>
						Latest zombies joined
					</h2>
					<Button variant='link' className='md:text-xl '>
						<Link href={'/gallery'} className='text-primary'>
							View all
						</Link>
					</Button>
				</div>
				<CarouselCards />
			</section>

			{loadingResult && <ZombieLoader />}
		</>
	)
}
