import Link from "next/link"
import { QRCodeCanvas, QRCodeSVG  } from "qrcode.react"
import CreateInvoice from "./createInvoice"
export default function TipFooter({ LNURL }) {
	return (
		<div className="text-center">
			<CreateInvoice />
		</div>
	)
}