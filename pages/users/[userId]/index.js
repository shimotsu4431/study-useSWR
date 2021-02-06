import useSWR from 'swr'
import Link from "next/link"
import axios from "axios";
import styles from "./user.module.css"

User.getInitialProps = async ({ query }) => {
  return { query };
};

export default function User({ query }) {
  const fetcher = (url)=> axios(url).then(res => res.data)
  const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/users/${query.userId}/posts`, fetcher, {
    refreshInterval: 10000
  })

  console.log(data)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <Link href={`/users`}>
        <a className={styles.home}>
          ← home
        </a>
      </Link>
      <h1>UserId: {data[0].userId}</h1>
      {data && data.length >= 1 && (
        data.map((post, idx) => {
          return (
            <div key={idx}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          )
        })
      )}
    </div>
  )
}
