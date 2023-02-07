import Date from "./date"
export default function PostSummary({date, title}) {
	return (
		<div className="py-2">
			<p className="text-2xl">{title}</p>
			<Date dateString={date} />
		</div>
	)
}
