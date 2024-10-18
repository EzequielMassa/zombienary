import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

function ZombieCard({
	className,
	children,
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<CardContainer className='inter-var rounded-lg'>
			<CardBody
				className={cn(
					'bg-transparent relative group/card backdrop-blur-lg dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-[20rem] p-4 rounded-lg flex justify-center items-center',
					className
				)}>
				<CardItem
					translateZ='100'
					className='w-full max-h-[15rem] mt-1 rounded-lg overflow-hidden'>
					{children}
				</CardItem>
			</CardBody>
		</CardContainer>
	)
}
export default ZombieCard
