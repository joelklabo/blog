import { getAllPostIds, getPostData } from "@/lib/posts";
import Layout from "@/components/layout";
import Date from "@/components/date";

export async function getStaticPaths() {
	const paths = getAllPostIds()
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id)
	return {
		props: {
			postData
		}
	}
}

export default function Post({ postData }) {
	return (
		<Layout>
			<div className="prose">
				<h1>{postData.title}</h1>
				<div>
					<Date dateString={postData.date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</div>
		</Layout>
	)
}