import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import BlurIn from '@/components/ui/blur-in'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Hero() {
	return (
		<BackgroundGradientAnimation
			containerClassName='hero-container'
			gradientBackgroundStart='rgb(30, 0, 40)'
			gradientBackgroundEnd='rgb(10, 10, 30)'
			secondColor='255, 140, 0'
			thirdColor='55, 222, 64'
			pointerColor='255, 0, 0'
			size='100%'
			blendingValue='screen'
			interactive={false}>
			<a
				href='https://cloudinary.com/'
				target='_blank'
				className='pointer-events-auto z-[999999]'>
				<div className='absolute z-50 bottom-0 right-0 gap-x-2 flex items-center justify-center text-white/75 p-4'>
					Powered by{' '}
					<img
						src='/cloudinary-svgrepo-com.svg'
						alt='cloudinary logo'
						width={30}
						height={30}
					/>
				</div>
			</a>
			<div className='absolute z-50 inset-0 flex flex-col items-center justify-center text-white p-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl'>
				<div className='flex flex-col justify-center items-center gap-4 py-4'>
					<BlurIn
						word='Zombienary'
						className='bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 font-zombieFont tracking-wide py-4 font-normal'
					/>
				</div>
				<div>
					<img
						src='/halloweenwebp.webp'
						alt=''
						className='w-100 h-100 mb-4'
						width={150}
						height={150}
					/>
				</div>

				<Button
					asChild
					type='button'
					className='z-[999999] pointer-events-auto text-dark-purple'>
					<Link href={'/gallery'}>Explore our zombie army </Link>
				</Button>
			</div>
		</BackgroundGradientAnimation>
	)
}
export default Hero
