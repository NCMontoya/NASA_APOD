export function trimText(text, length) {
	const trimmedTextArray = [];
	const wordsArray = text.split(' ');
	for (let i = 0, currLength = 0; currLength <= length && i < wordsArray.length; i++) {
		trimmedTextArray.push(wordsArray[i]);
		currLength += wordsArray[i].length;
	}

	const trimmedText = trimmedTextArray.join(' ');
	return trimmedText == text ? trimmedText : trimmedText + '...';
}

export function getNextDay(date) {
	const milisecondsPerDay = 1000 * 60 * 60 * 24;
	const currDate = new Date(`${date} GMT+00:00`);
	return new Date(currDate.getTime() + milisecondsPerDay);
}

export function formatDate(date) {
	return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDay()}`;
}