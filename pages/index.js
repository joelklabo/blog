import { Inter } from '@next/font/google'
import Layout from '@/components/layout'
import { getSortedPostsData } from '@/lib/posts'
import PostSummary from '@/components/postSummary'
import Link from 'next/link'

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
          <Link href={`posts/${id}`} key={id}>
            <PostSummary title={title} date={date} key={id} />
          </Link>
        ))}
      </Layout>
    </div>
  )
}
