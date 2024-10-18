function ZombieLoader() {
	return (
		<div className='flex flex-col justify-center items-center w-full h-[400] py-10'>
			<img
				src='/zombiegif.webp'
				alt='Loading...'
				className='w-24 h-24 md:w-48 md:h-48'
			/>
			<p className='bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 font-zombieFont tracking-wide py-4 font-normal text-3xl'>
				Loading...
			</p>
		</div>
	)
}
export default ZombieLoader
