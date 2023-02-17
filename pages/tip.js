import Layout from "@/components/layout";
import PaidInvoices from "@/components/paidInvoices";
import TipFooter from "@/components/tipFooter";

export async function getServerSideProps() {
	const res = await fetch(`https://${process.env.BASE_URL}/api/lightning/pays`);
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
				<PaidInvoices paidInvoices={paidInvoices} />
			</Layout>
		</div>
	)
}