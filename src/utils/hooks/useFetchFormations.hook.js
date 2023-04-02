import { useQuery } from "@tanstack/react-query";

const useFetchFormations = () => {
	return useQuery(["formations"], async () => {
        const data = await fetch(`https://localhost/api/formations/all`);
		return data.json();
	});
};

export default useFetchFormations;
