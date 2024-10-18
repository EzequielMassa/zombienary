'use client'

import { useResourceContext } from '@/app/context/ResourceContext'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'

function UploadWidget({ text }: { text: string }) {
	const { loadingResult, uploadResource, setFinalResult } = useResourceContext()

	return (
		<CldUploadWidget
			uploadPreset='unsigned_zombienary'
			options={{
				maxFiles: 1,
				sources: ['local'],
				folder: 'zombienary',
			}}
			onSuccess={(result: any) => {
				setFinalResult(undefined)
				uploadResource(result.info!)
			}}>
			{({ open }) => {
				return (
					<Button
						onClick={() => open()}
						disabled={loadingResult}
						className='bg-green-700 text-xl py-4 inline-flex gap-x-2 justify-center items-center'
						size={'lg'}>
						{loadingResult ? (
							<Loader2 className='animate-spin' />
						) : (
							<div className='flex gap-x-2 items-center'>
								{text}
								<img
									src='/zombie-svgrepo-com.svg'
									alt='join button image'
									className='w-10 text-white'
								/>
							</div>
						)}
					</Button>
				)
			}}
		</CldUploadWidget>
	)
}
export default UploadWidget
