import { useQuery } from "@tanstack/react-query";

export const useFetchLesson = (lessonId) => {
	return useQuery(["lesson", lessonId], async () => {
		const data = await fetch(`https://localhost/api/lesson/${lessonId}`);
		return data.json();
	});
};
