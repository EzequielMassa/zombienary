'use client'

import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import type { CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import { createContext, ReactNode, useContext, useState } from 'react'

interface ResourceContextType {
	resource: CloudinaryUploadWidgetInfo | undefined
	uploadResource: (resourceData: CloudinaryUploadWidgetInfo) => Promise<void>
	resources: CloudinaryUploadWidgetInfo[] | undefined
	setResource: React.Dispatch<
		React.SetStateAction<CloudinaryUploadWidgetInfo | undefined>
	>
	loadingResources: boolean
	setTotalResources: React.Dispatch<React.SetStateAction<number | undefined>>
	loadResources: (cursor?: string | null) => Promise<void>
	setFinalResult: React.Dispatch<
		React.SetStateAction<CloudinaryUploadWidgetInfo | undefined>
	>
	setLoadingResult: React.Dispatch<React.SetStateAction<boolean>>
	totalResources: number | undefined
	finalResult: CloudinaryUploadWidgetInfo | undefined
	loadingResult: boolean
	loadMoreResources: () => void
	hasMore: boolean
}

export const ResourceContext = createContext<ResourceContextType | undefined>(
	undefined
)

export const ResourceContextProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const [resource, setResource] = useState<
		CloudinaryUploadWidgetInfo | undefined
	>()
	const [resources, setResources] = useState<
		CloudinaryUploadWidgetInfo[] | undefined
	>()
	const [loadingResources, setLoadingResources] = useState<boolean>(false)
	const [totalResources, setTotalResources] = useState<number | undefined>()
	const [finalResult, setFinalResult] = useState<
		CloudinaryUploadWidgetInfo | undefined
	>()

	const [loadingResult, setLoadingResult] = useState<boolean>(false)
	const [nextCursor, setNextCursor] = useState<string | null>(null)
	const [hasMore, setHasMore] = useState<boolean>(true)
	const { toast } = useToast()

	async function loadResources(cursor?: string | null) {
		setLoadingResources(true)

		try {
			const response = await axios.get('/api/collection', {
				params: { next_cursor: cursor || undefined },
			})

			const { resources: newResources, next_cursor } = response.data

			setResources((prevResources) => {
				const filteredNewResources = newResources.filter(
					(newResource: any) =>
						!prevResources?.some(
							(prevResource: any) =>
								prevResource.asset_id === newResource.asset_id
						)
				)
				return [...(prevResources || []), ...filteredNewResources]
			})

			setTotalResources((prev) => (prev || 0) + newResources.length)
			setNextCursor(next_cursor || null)
			setHasMore(!!next_cursor)
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your request.',
			})
		} finally {
			setLoadingResources(false)
		}
	}

	async function uploadResource(
		resourceData: string | CloudinaryUploadWidgetInfo
	) {
		try {
			setLoadingResult(true)
			setResource(resourceData as CloudinaryUploadWidgetInfo)
			const result = await axios.post('/api/upload', { resource: resourceData })
			setFinalResult(result.data.imageResult)
			setResources((prevResources) => [
				...(prevResources || []),
				result.data.imageResult,
			])
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'Please try again.',
			})
		} finally {
			setLoadingResult(false)
		}
	}

	function loadMoreResources() {
		if (hasMore) {
			loadResources(nextCursor)
		}
	}

	return (
		<ResourceContext.Provider
			value={{
				resource,
				setResource,
				uploadResource,
				finalResult,
				setFinalResult,
				loadingResult,
				setLoadingResult,
				resources,
				loadingResources,
				totalResources,
				setTotalResources,
				hasMore,
				loadResources,
				loadMoreResources,
			}}>
			{children}
		</ResourceContext.Provider>
	)
}

export const useResourceContext = () => {
	const context = useContext(ResourceContext)
	if (!context) {
		throw new Error(
			'ResourceContext debe ser utilizado dentro de un ResourceContextProvider'
		)
	}
	return context
}
