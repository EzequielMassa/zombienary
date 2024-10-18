import { ResourceContextProvider } from '@/app/context/ResourceContext'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Zombienary',
	description: 'a cloudinary image transformer app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-dark-purple to-dark-blue-black animate-gradient`}>
				<ResourceContextProvider>
					<main>
						{children} <Toaster />
					</main>
				</ResourceContextProvider>
			</body>
		</html>
	)
}
