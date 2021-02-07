import Head from 'next/head'
import Link from "next/link"
import styles from '../styles/Home.module.css'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <p className={styles.text}>
          <Link href="/users">
            <a className={styles.link}>/users</a>
          </Link>
        </p>
        <p className={styles.text}>
          <Link href="/todos">
            <a className={styles.link}>/todos</a>
         </Link>
        </p>
      </main>
    </div>
  )
}
