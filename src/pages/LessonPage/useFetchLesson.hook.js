import { useQuery } from "@tanstack/react-query";

export const useFetchLesson = (lessonId, type) => {
	return useQuery(["lesson", lessonId, type], async () => {
		const data = await fetch(
			`https://localhost/api/content/all?id=${lessonId}&type=${type}`
		);
		return data.json();
	});
};
