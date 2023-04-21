export const formatDuration = (duration) => {
	if (duration < 60 * 60 * 1000) {
		const minutes = Math.floor(duration / (60 * 1000));
		return `${minutes} minutes`;
	} else {
		const hours = Math.floor(duration / (60 * 60 * 1000));
		const remainingMinutes = Math.floor(
			(duration % (60 * 60 * 1000)) / (60 * 1000)
		);
		return `${hours} h ${remainingMinutes} min`;
	}
};