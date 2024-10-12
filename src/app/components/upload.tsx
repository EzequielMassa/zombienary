'use client'

import axios from 'axios'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import { useEffect, useState } from 'react'

function UploadWidget() {
	const [resource, setResource] = useState<
		string | CloudinaryUploadWidgetInfo | undefined
	>()
	const [finalResult, setFinalResult] = useState<
		string | CloudinaryUploadWidgetInfo | undefined
	>()
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const uploadResource = async () => {
			if (resource) {
				try {
					setLoading(true)
					const result = await axios.post('/api/upload', { resource })
					setFinalResult(result.data.imageResult)
				} catch (error) {
					console.error('Error uploading resource:', error)
				} finally {
					setLoading(false)
				}
			}
		}
		uploadResource()
	}, [resource])

	useEffect(() => {
		console.log(finalResult)
	}, [finalResult])

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<CldUploadWidget
			uploadPreset='unsigned_images'
			options={{ maxFiles: 1, sources: ['local'] }}
			onSuccess={(result) => {
				setResource(result?.info)
			}}>
			{({ open }) => {
				return <button onClick={() => open()}>Upload an Image</button>
			}}
		</CldUploadWidget>
	)
}
export default UploadWidget
