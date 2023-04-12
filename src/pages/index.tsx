import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Typography } from '@mui/material' 
import homePageData from '@/lib/home.page'
import { Component } from '@/lib/models/HomePageModel'
import HomePageComponent from './home'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Probability</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}> 
        </div>

        <div className={styles.center}>
          <HomePageComponent/>
        </div>

        <div className={styles.grid}>
        </div>
      </main>
    </>
  )
}
