import useSWR, { mutate } from 'swr'
import axios from "axios";
import { useCallback } from 'react';
import getConfig from 'next/config'

import Header from '../../../components/Header'
import Loading from "../../../components/Loading"

const { publicRuntimeConfig } = getConfig()
const { API_URL } = publicRuntimeConfig

User.getInitialProps = async ({ query }) => {
  return { query };
};

export default function User({ query }) {
  const fetcher = (url)=> axios(url).then(res => res.data)
  const { data, error } = useSWR(`${API_URL}/users/${query.userId}/posts`, fetcher, {
    refreshInterval: 0
  })

  const handleClick = useCallback(() => {
    mutate(`${API_URL}/users/${query.userId}/posts`)
  },[])

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <>
      <Header />
      <div>
        <div>
          <button onClick={handleClick}>ReFetch</button>
        </div>
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
    </>
  )
}
