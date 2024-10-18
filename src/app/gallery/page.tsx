'use client'
import ShineBorderSkeleton from '@/app/components/ShineBorderSkeleton'
import { useResourceContext } from '@/app/context/ResourceContext'
import BlurIn from '@/components/ui/blur-in'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import ShineBorder from '@/components/ui/shine-border'
import { Slash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

function Page() {
	const { resources, loadingResources, loadResources, loadMoreResources } =
		useResourceContext()
	const { ref, inView } = useInView({ threshold: 0.5 })

	useEffect(() => {
		if (!resources) {
			loadResources(null)
		}
	}, [])

	useEffect(() => {
		if (inView) {
			loadMoreResources()
		}
	}, [inView])

	return (
		<div className='grid items-center max-w-screen-lg mx-auto py-8'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<Link
							href='/'
							className='text-muted-foreground hover:text-primary text-sm md:text-lg'>
							Home
						</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<Slash />
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<Link href='/gallery' className='text-primary text-sm md:text-lg'>
							Gallery
						</Link>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className='flex flex-col justify-center items-center gap-4 py-8'>
				<BlurIn
					word='Zombienary Army'
					className='bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 font-zombieFont tracking-wide py-4 font-normal'
				/>
			</div>
			<section
				id='gallery'
				className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto'>
				{resources
					? resources.map((item) => (
							<ShineBorder
								className='relative bg-transparent w-full md:w-fit'
								color={['#A07CFE', '#f97316', '#FFBE7B']}
								key={item.asset_id}>
								<a href={item.url} target='_blank'>
									<div
										className='w-full h-[200px] md:w-[200px] md:h-[200px] relative rounded-lg hover:scale-110 transition-all relative'
										ref={ref}>
										<Image
											src={item.url}
											alt={item.public_id}
											width={200} // Establece un valor numérico en píxeles
											height={200} // Establece un valor numérico en píxeles
											className='object-contain object-center rounded-lg w-full h-full'
										/>
									</div>
								</a>
							</ShineBorder>
					  ))
					: null}
				{loadingResources ? (
					<div className='col-span-full md:col-span-full justify-center items-center'>
						<ShineBorderSkeleton />
					</div>
				) : null}
			</section>
		</div>
	)
}
export default Page
