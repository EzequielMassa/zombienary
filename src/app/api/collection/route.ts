import { NextRequest, NextResponse } from 'next/server'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const maxResults = searchParams.get('max_results') || '20'
	const nextCursor = searchParams.get('next_cursor') || ''

	try {
		const result = await cloudinary.search
			.expression('folder:zombienary/edits')
			.sort_by('created_at', 'desc')
			.max_results(Number(maxResults))
			.next_cursor(nextCursor)
			.execute()

		return NextResponse.json({
			resources: result.resources,
			next_cursor: result.next_cursor,
			has_more: result.has_more,
		})
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Error al cargar los recursos',
			},
			{
				status: 400,
			}
		)
	}
}
