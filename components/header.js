import { FaGithub, FaTwitter, FaBitcoin } from 'react-icons/fa'
import { GiOstrich } from 'react-icons/gi'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import Link from "next/link"
export default function Header() {
	return (
		<header className="bg-gray-100">
			<div className="flex flex-col items-center sm:flex-row justify-between text-center py-3 px-4">
				<div className="md:flex-none">
					<Link href={"/"}>
						<span className="text-2xl">klabo.blog</span>
					</Link>
				</div>
				<div className="flex gap-6 pt-1 sm:pt-0">
					<Link href={"/tip"}>
						<div className="flex items-center">
							<FaBitcoin /> <span className="pl-2 pr-2">+</span> <BsFillLightningChargeFill />
						</div>
					</Link>
				</div>
				<div className="flex gap-6 pt-2 sm:pt-0">
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
