import { useQuery } from "@tanstack/react-query";

const useFetchQuizz = () => {
	return useQuery(["quizz"], async () => {
		const data = await fetch("/mock/quizzList.mock.json");
		return data.json();
	});
};

export default useFetchQuizz;
