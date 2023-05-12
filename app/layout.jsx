import { Header } from '@/components/Header'
import '../assets/global.scss';
import { Montserrat, Lora } from 'next/font/google'
import { Providers } from '@/components/Providers';
import style from '@/dist/index.module.css'



const montserrat = Montserrat({

  subsets: ['latin', 'cyrillic', 'cyrillic-ext', 'latin-ext'],
  variable: "--font-montserrat",
  display: 'swap'
})

const lora = Lora({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext', 'latin-ext'],
  variable: "--font-lora",
  display: 'swap'
})


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={style.html} >
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='w-full h-full'>
        <main className={`${montserrat.variable} ${lora.variable} w-full relative h-full`}>

          <Providers>
            <Header />
            {children}
          </Providers>
        </main>

      </body>
    </html>
  )
}
