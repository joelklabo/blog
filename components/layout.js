import Head from "next/head";
import Header from "./header";

export default function Layout({children, title}) {
	return (
		<div>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>{ title }</title>
			</Head>
			<Header />
			<main className="px-6 py-12 max-w-2xl content-center m-auto">
				{children}
			</main>
		</div>
	)
}
