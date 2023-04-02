import { useQuery } from "@tanstack/react-query";

const useFetchFormation = (id) => {
	return useQuery(["formation"], async () => {
        const data = await fetch(`https://localhost/api/formations/${id}`);
		return data.json();
	});
};

export default useFetchFormation;
