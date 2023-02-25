import RelativeDate from "./relativeDate";

export default function PaidInvoice({paidInvoice}) {
	return (
		<tr class="bg-white border-b">
			<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
				<RelativeDate dateString={paidInvoice.date} />
			</th>
			<td class="px-6 py-4 truncate">
				{paidInvoice.description}
			</td>
			<td class="px-6 py-4 text-right">
				{paidInvoice.amount}
			</td>
		</tr>
	)
}