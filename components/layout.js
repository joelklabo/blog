import Head from "next/head";
import Header from "./header";

export default function Layout({children, home}) {
	return (
		<div>
			<Head>
			</Head>
			<Header />
			<main className="px-6 py-6">
				{children}
			</main>
		</div>
	)
}
