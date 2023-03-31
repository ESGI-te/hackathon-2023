import { useQuery } from "@tanstack/react-query";

const useFetchFormation = () => {
	return useQuery(["formation"], async () => {
		const data = await fetch("/mock/formation.mock.json");
		return data.json();
	});
};

export default useFetchFormation;
