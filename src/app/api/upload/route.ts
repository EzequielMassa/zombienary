import { NextRequest, NextResponse } from 'next/server'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
	const { resource } = await request.json()

	try {
		const imageUrl = await applyZombieFilter(resource.public_id)
		const urlMatch = imageUrl.match(/src=['"]([^'"]+)['"]/)
		const result = urlMatch ? urlMatch[1] : null

		const upload = await cloudinary.uploader.unsigned_upload(
			result as string,
			'unsigned_zombienary',
			{
				folder: 'zombienary/edits',
				timeout: 60000,
			}
		)

		return NextResponse.json({
			message: 'Imagen subida y transformada correctamente',
			imageResult: upload,
		})
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Error al subir la imagen',
			},
			{
				status: 400,
			}
		)
	}
}

async function applyZombieFilter(publicId: string): Promise<string> {
	return new Promise<string>((resolve) => {
		const result = cloudinary.image(publicId, {
			transformation: [
				{ effect: 'gen_replace:from_face;to_zombie_mask' },
				{ effect: 'gen_replace:from_clothes;to_zombie_clothes_with_blood' },
				{ effect: 'gen_background_replace:prompt_an apocalypt scene' },
			],
		})
		resolve(result as string)
	})
}
