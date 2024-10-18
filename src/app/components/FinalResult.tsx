'use client'

import { useResourceContext } from '@/app/context/ResourceContext'
import { Button } from '@/components/ui/button'
import { Compare } from '@/components/ui/Compare'
import { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'

function FinalResult() {
	const { finalResult, loadingResult, resource } = useResourceContext()
	const [showConfetti, setShowConfetti] = useState<boolean>(false)
	const [originalImage, setOriginalImage] = useState<string | undefined>()

	useEffect(() => {
		if (resource?.url) {
			setOriginalImage(resource?.url)
		}
	}, [resource])

	useEffect(() => {
		if (!loadingResult && finalResult) {
			setShowConfetti(true)
		}
	}, [finalResult])

	return (
		<>
			<div className='w-full flex flex-col items-center justify-center p-10'>
				<h1 className='bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 font-zombieFont tracking-wide py-4 font-normal text-3xl'>
					Welcome to Zombienary Army.
				</h1>
				<Confetti
					active={showConfetti}
					config={{ elementCount: 200, spread: 90 }}
				/>
				<div className='p-4 rounded-3xl dark:bg-neutral-900 bg-black/50 dark:border-neutral-800 px-4 flex flex-col gap-4'>
					<Compare
						firstImage={originalImage}
						secondImage={finalResult?.url}
						firstImageClassName='object-cover object-left-top'
						secondImageClassname='object-cover object-left-top'
						className='h-[400] w-[500px] md:h-[300px] md:w-[400px]'
						slideMode='hover'
						autoplay={false}
					/>
					<a
						href={finalResult?.url}
						target='_blank'
						download='image.png'
						className='w-full flex'>
						<Button type='button' className='w-full'>
							Download Image
						</Button>
					</a>
				</div>
			</div>
		</>
	)
}
export default FinalResult
