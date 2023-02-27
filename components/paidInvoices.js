import PaidInvoice from "./paidInvoice"

export default function PaidInvoices({paidInvoices}) {
	return (
		<table className="table-auto w-full text-sm text-left text-gray-500">
			<thead className="text-xs text-gray-700 uppercase bg-gray-100">
				<tr>
						<th scope="col" class="px-6 py-3">
							Date 
						</th>
						<th scope="col" class="px-6 py-3">
							Message
						</th>
						<th scope="col" class="px-6 py-3 text-right">
							Sats
						</th>
				</tr>
			</thead>
			 <tbody>
				{paidInvoices.map((paidInvoice) => (
					<PaidInvoice paidInvoice={paidInvoice} key={paidInvoice.date} />
				))};
			</tbody>
		</table>
	)
}