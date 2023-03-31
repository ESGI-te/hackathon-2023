import { useQuery } from "@tanstack/react-query";

const useFetchFormations = () => {
	return useQuery(["formations"], async () => {
		const data = await fetch("/mock/formations.mock.json");
		return data.json();
	});
};

export default useFetchFormations;
