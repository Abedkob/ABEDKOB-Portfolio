import type { Metadata, Viewport } from 'next'
import { Orbitron, Share_Tech_Mono, Rajdhani } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
  display: 'swap',
})

const rajdhani = Rajdhani({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "ABEDKOB STUDIOS | Portfolio",
  description: "...",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "180x180" },
    ],
    apple: [
      { url: "/favicon.png", type: "image/png", sizes: "180x180" },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0e1a',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${orbitron.variable} ${shareTechMono.variable} ${rajdhani.variable} font-sans antialiased overflow-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
