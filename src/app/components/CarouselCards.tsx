'use client'

import ImageSkeleton from '@/app/components/ImageSkeleton'
import ZombieCard from '@/app/components/ZombieCard'
import { useResourceContext } from '@/app/context/ResourceContext'
import Marquee from '@/components/ui/marquee'
import { type CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import Image from 'next/image'
import { useEffect } from 'react'
type CarouselCardProps = {
	resources: string[] | CloudinaryUploadWidgetInfo[] | undefined
	loadingResources: boolean
	loadResources: (cursor?: string | null) => Promise<void>
	finalResult: string | CloudinaryUploadWidgetInfo | undefined
}
function CarouselCards() {
	const { resources, loadingResources }: CarouselCardProps =
		useResourceContext()

	const firstRow = resources?.slice(0, resources.length / 2)
	const secondRow = resources?.slice(resources.length / 2)

	useEffect(() => {}, [resources])

	return (
		<div className='relative flex h-[600px] w-[90vw] flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent md:shadow-xl'>
			<Marquee pauseOnHover className='[--duration:50s] rounded-lg'>
				{loadingResources
					? Array(5)
							.fill(null)
							.map((_, index) => <ImageSkeleton key={index} />)
					: firstRow?.map((item) => (
							<ZombieCard key={`${item.asset_id}`}>
								<div className='flex justify-center items-center rounded-lg'>
									<a href={item.url} target='_blank'>
										<Image
											src={item.url}
											alt={'zombie image'}
											width={300}
											height={200}
										/>
									</a>
								</div>
							</ZombieCard>
					  ))}
			</Marquee>

			<Marquee reverse pauseOnHover className='[--duration:50s] rounded-lg'>
				{secondRow?.map((item) => (
					<ZombieCard key={`${item.asset_id}`}>
						<div className='flex justify-center items-center rounded-lg'>
							<a href={item.url} target='_blank'>
								<Image
									src={item.url}
									alt={'zombie image'}
									width={300}
									height={200}
								/>
							</a>
						</div>
					</ZombieCard>
				))}
			</Marquee>

			<div className='pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-dark-purple dark:from-dark-purple'></div>
			<div className='pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-dark-purple dark:from-dark-purple'></div>
		</div>
	)
}

export default CarouselCards
