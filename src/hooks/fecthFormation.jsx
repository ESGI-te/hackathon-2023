import { useQuery } from "@tanstack/react-query";

export const useFetchFormation = () => {
    return useQuery(["formation"], async () => {
        const data = await fetch("/mock/formation.mock.json");
        return data.json();
    });
};