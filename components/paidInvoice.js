import RelativeDate from "./relativeDate";

export default function PaidInvoice({paidInvoice}) {
	return (
		<tr class="bg-white border-b">
			<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
				<RelativeDate dateString={paidInvoice.paid_at} />
			</th>
			<td class="px-6 py-4">
				{paidInvoice.description}
			</td>
			<td class="px-6 py-4 text-right">
				{paidInvoice.msatoshi / 1000}
			</td>
		</tr>
	)
}