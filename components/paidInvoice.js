import { DefaultType, KeysendType, NostrType, TipType } from "@/models/paidInvoice";
import RelativeDate from "./relativeDate";

export default function PaidInvoice({paidInvoice}) {
	return (
		<tr class="bg-white border-b">
			<th scope="row" class="px-6 py-4 font-medium text-gray-900">
				<RelativeDate dateString={paidInvoice.date} />
			</th>
			<td class="px-6 py-4 truncate break-words">
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
		<span>⚡️ Zap from {paidInvoice.pubkey.slice(0, 32)}...</span>
	)
};

function TipMessage({paidInvoice}) {
	return (
		<span>⚡️ Tip</span>
	)
};

function KeysendMessage({paidInvoice}) {
	let message = paidInvoice.message;
	
	function makeMessage(message) {
		let formattedMessage = message;
		if (paidInvoice.message.includes("keysend:")) {
			formattedMessage = paidInvoice.message.split("keysend:")[1];
		}
		if (paidInvoice.message.includes("keysend")) {
			formattedMessage = paidInvoice.message.split("keysend")[1];
		}
		return formattedMessage.slice(0,32) + '...';
	}
	
	return (
		<span>🔑 {makeMessage(message)}</span>
	)
};

function DefaultMessage({paidInvoice}) {
	return (
		<span>💰 {paidInvoice.message.slice(0,32)}</span>
	)
};