import { useQuery } from "@tanstack/react-query";

const useFetchLessons = () => {
	return useQuery(["lessons"], async () => {
		const data = await fetch("/mock/lessons.mock.json");
		return data.json();
	});
};

export default useFetchLessons;
