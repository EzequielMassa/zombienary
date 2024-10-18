import { Skeleton } from '@/components/ui/skeleton'

function ImageSkeleton() {
	return (
		<div className='flex justify-center items-center rounded-lg'>
			<a href='#'>
				<Skeleton className='w-[300px] h-[200px] rounded-lg' />
			</a>
		</div>
	)
}

export default ImageSkeleton
