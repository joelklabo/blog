import Date from "./date"
export default function PostSummary({date, title}) {
	return (
		<div className="py-2">
			<p className="text-lg">{title}</p>
			<Date dateString={date} />
		</div>
	)
}
