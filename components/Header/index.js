import Link from "next/link"
import styles from './Header.module.css'

export default function Header() {
  return (
    <header>
      <Link href="/">
        <a className={styles.link}>Home</a>
      </Link>
    </header>
  )
}