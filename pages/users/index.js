import useSWR from 'swr'
import axios from "axios";
import Link from "next/link"
import getConfig from 'next/config'

import styles from "./users.module.css"
import Loading from "../../components/Loading"
import Header from '../../components/Header'

const { publicRuntimeConfig } = getConfig()
const { API_URL } = publicRuntimeConfig

export default function Users() {
  const fetcher = (url)=> axios(url).then(res => res.data)
  const { data, error } = useSWR(`${API_URL}/users`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <>
    <Header />
    <div>
      <h1>Users</h1>
      {data && data.length >= 1 && (
        data.map((user, idx) => {
          return (
            <div key={idx} className={styles.user}>
              <Link href={`/users/${user.id}`}>
                <a className={styles.userLink}>
                  <h2 className={styles.userName}>{user.name}</h2>
                </a>
              </Link>
            </div>
          )
        })
      )}
    </div>
    </>
  )
}
