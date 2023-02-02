import { FaGithub, FaTwitter } from 'react-icons/fa'
import { GiOstrich } from 'react-icons/gi'
import Link from "next/link"
export default function Header() {
	return (
		<header className="bg-gray-100">
			<div className="xl:container xl:ml-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3 px-4">
				<div className="md:flex-none">
					<Link href={"/"}>
						<span className="text-2xl">klabo.blog</span>
					</Link>
				</div>
				<div className="flex gap-6">
					<Link href={"/projects"}>
						<span>projects</span>
					</Link>
					<Link href={"/contact"}>
						<span>contact</span>
					</Link>
					<Link href={"/tip"}>
						<span>tip</span>
					</Link>
				</div>
				<div className="flex gap-6">
					<Link href="nostr:2f4fa408d85b962d1fe717daae148a4c98424ab2e10c7dd11927e101ed3257b2">
						<GiOstrich />
					</Link>
					<Link href="https://github.com/joelklabo">
						<FaGithub />
					</Link>
					<Link href="https://twitter.com/joelklabo">
						<FaTwitter />
					</Link>
				</div>
			</div>
		</header>
	)
}
