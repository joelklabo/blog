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
		<div>
			<Layout>
				<TipFooter />
				{paidInvoices.map((paidInvoice) => (
					<PaidInvoice paidInvoice={paidInvoice} key={paidInvoice.payment_hash} />
				))};
			</Layout>
		</div>
	)
}