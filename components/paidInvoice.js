import { DefaultType, KeysendType, NostrType, TipType } from "@/models/paidInvoice";
import RelativeDate from "./relativeDate";

export default function PaidInvoice({paidInvoice}) {
	return (
		<tr class="bg-white border-b">
			<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
				<RelativeDate dateString={paidInvoice.date} />
			</th>
			<td class="px-6 py-4 truncate">
			{(() => {
        switch (paidInvoice.type) {
          case NostrType:
            return <NostrMessage paidInvoice={paidInvoice} /> 
          case TipType:
            return <TipMessage paidInvoice={paidInvoice} />
          case KeysendType:
            return <KeysendMessage paidInvoice={paidInvoice} />
          default:
            return <DefaultMessage paidInvoice={paidInvoice} /> 
        }
      })()}
			</td>
			<td class="px-6 py-4 text-right">
				{paidInvoice.amount}
			</td>
		</tr>
	)
}

function NostrMessage({paidInvoice}) {
	return (
		<p>⚡️ Zap from {paidInvoice.pubkey}</p>
	)
};

function TipMessage({paidInvoice}) {
	return (
		<p>⚡️ Tip</p>
	)
};

function KeysendMessage({paidInvoice}) {
	let message = paidInvoice.message;
	
	function makeMessage(message) {
		if (paidInvoice.message.includes("keysend:")) {
			return paidInvoice.message.split("keysend:")[1];
		}
		if (paidInvoice.message.includes("keysend")) {
			return paidInvoice.message.split("keysend")[1];
		}
		return message;
	}
	
	return (
		<p>🔑 {makeMessage(message)}</p>
	)
};

function DefaultMessage({paidInvoice}) {
	return (
		<p>💰 {paidInvoice.message}</p>
	)
};