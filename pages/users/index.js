import useSWR from 'swr'
import Link from "next/link"
import styles from "./users.module.css"

export default function Users() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher)

  console.log(data)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
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
  )
}
