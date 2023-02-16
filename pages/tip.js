import Layout from "@/components/layout";
import PaidInvoice from "@/components/paidInvoice";
import TipFooter from "@/components/tipFooter";

export async function getServerSideProps() {
	const res = await fetch('https://beta.klabo.blog/api/lightning/pays');
	const result = await res.json();
	return {
		props: {
			paidInvoices: result.paidInvoices
		}
	}
}

export default function Tip({ paidInvoices}) {
	return (
		<div class="overflow-hidden">
			<Layout>
				<TipFooter />
				<div class="overflow-auto">
    		<table class="table-fixed w-full text-sm text-left text-gray-500">
      		<thead class="text-xs text-gray-700 uppercase bg-gray-100">
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
							<PaidInvoice paidInvoice={paidInvoice} key={paidInvoice.payment_hash} />
						))};
					</tbody>
					</table>
				</div>
			</Layout>
		</div>
	)
}