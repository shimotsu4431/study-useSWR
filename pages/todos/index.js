import useSWR from 'swr'
import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { API_URL } = publicRuntimeConfig

export const fetcher = (url)=> axios(url).then(res => res.data)

export async function getServerSideProps() {
  const data = await fetcher(`${API_URL}/todos`)
  return { props: { data } }
}

export default function Todos(props) {
  const initialData = props.data
  const { data } = useSWR(`${API_URL}/todos`, fetcher, { initialData })

  return (
    <>
    <h2>Todos</h2>
    {data && data.length >= 1 && (
      data.map((t) => {
        return <p key={t.id}>{t.id}: {t.title}</p>
      })
    )}
    </>
  )
}