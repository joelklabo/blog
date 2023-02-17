import { parseJSON, formatRelative } from 'date-fns';

export default function RelativeDate({ dateString }) {
	const date = parseJSON(dateString)
	const originalDate = new Date(dateString * 1000);
	return <time dateTime={dateString}>{formatRelative(originalDate, new Date(), { addSuffix: true })}</time>
}