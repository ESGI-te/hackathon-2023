import { useQuery } from "@tanstack/react-query";

export const useFetchLesson = (lessonId) => {
	return useQuery(["lesson", lessonId], async () => {
		const data = await fetch("/mock/lesson.mock.json");
		return data.json();
	});
};
