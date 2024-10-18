import { Ghost } from 'lucide-react'

function ShineBorderSkeleton() {
	return (
		<div className='relative bg-transparent flex justify-center items-center'>
			<Ghost className='h-[200px] w-[200px] relative rounded-lg text-primary animate-pulse text-center' />
		</div>
	)
}

export default ShineBorderSkeleton
