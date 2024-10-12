import { NextRequest, NextResponse } from 'next/server'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
	const { resource } = await request.json()

	const edit1Url = await applyFilter(resource.public_id, 'face', 'zombie mask')

	const upload1 = await cloudinary.uploader.upload(edit1Url as string, {
		folder: 'zombienary',
	})

	const edit2Url = await applyFilter(
		upload1.public_id,
		'clothes',
		'zombie costume'
	)

	const upload2 = await cloudinary.uploader.upload(edit2Url as string, {
		folder: 'zombienary/edits',
	})

	return NextResponse.json({
		message: 'Imagen subida y transformada correctamente',
		imageResult: upload2,
	})
}

async function applyFilter(
	publicId: string,
	fromEffect: string,
	toEffect: string
) {
	return new Promise((resolve) => {
		const result = cloudinary.url(publicId, {
			transformation: [
				{ effect: `gen_replace:from_${fromEffect};to_${toEffect}` },
			],
		})
		resolve(result)
	})
}
