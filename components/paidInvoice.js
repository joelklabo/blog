export default function PaidInvoice({paidInvoice}) {
	return (
		<div>
				<div className="text-2xl">Paid Invoice</div>
				<div className="text-xl">{paidInvoice.msatoshi/1000}</div>
		</div>
	)
}