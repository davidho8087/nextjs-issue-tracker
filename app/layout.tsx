import '@radix-ui/themes/styles.css'
import './theme-config.css'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Container, Theme } from '@radix-ui/themes'
import NavBar from '@/app/NavBar'
import AuthProvider from '@/app/auth/Provider'

const roboto = Roboto({
  display: 'swap',
  variable: '--font-roboto',
  adjustFontFallback: true,
  preload: true,
  subsets: ['latin'],
  style: ['normal'],
  weight: ['300', '400'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} font-sans`}>
        <AuthProvider>
          <Theme accentColor='violet'>
            <NavBar />
            <main className='p-5'>
              <Container>{children}</Container>
            </main>
            {/*<ThemePanel />*/}
          </Theme>
        </AuthProvider>
      </body>
    </html>
  )
}
