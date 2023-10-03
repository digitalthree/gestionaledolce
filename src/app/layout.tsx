import './globals.css'
import {Inter} from 'next/font/google'
import {UserProvider} from '@auth0/nextjs-auth0/client';
import {Providers} from "@/store/Providers";


const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Gestionale Dolce',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (

        <html lang="en" data-theme="light">
        <body className={inter.className}>

        <UserProvider>
            <Providers>
                {children}
            </Providers>
        </UserProvider>

        </body>
        </html>

    )
}
