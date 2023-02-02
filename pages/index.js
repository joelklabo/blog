import Head from 'next/head'
import { Inter } from '@next/font/google'
import Layout from '@/components/layout'
import { getSortedPostsData } from '@/lib/posts'
import PostSummary from '@/components/postSummary'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <div>
      <Layout>
        {allPostsData.map(({title, date, id}) => (
          <PostSummary title={title} date={date} key={id} />
        ))}
      </Layout>
    </div>
  )
}
