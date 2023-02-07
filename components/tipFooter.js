import Link from "next/link"
import { QRCodeCanvas, QRCodeSVG  } from "qrcode.react"
export default function TipFooter({ LNURL }) {
	return (
		<div className="text-center">
			<h3 className="text-xl mb-8">If you found this useful, leave me a tip</h3>
			<Link href={`lightning:${LNURL}`}>
				<QRCodeCanvas value={LNURL} className="m-auto" />
			</Link>
		</div>
	)
}