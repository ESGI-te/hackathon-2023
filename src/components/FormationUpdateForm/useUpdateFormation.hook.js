import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useUpdateFormation(id) {
    const queryClient = useQueryClient();
    const history = useNavigate();

    return useMutation({
        mutationFn: async(formData) => {
            const response = await fetch(`https://localhost/api/formations/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            return response.json();
        },
        onMutate: async(data) => {
            /**
             * Cancel any outgoing refetches
             * (so they don't overwrite our optimistic update)
             */
            await queryClient.cancelQueries({ queryKey: ["formations"] });

            // Snapshot the previous value
            const previousState = queryClient.getQueryData(["formations"]);

            // Optimistically update to the new value
            queryClient.setQueryData(["formations"], () => data);

            // Return a context object with the snapshotted value
            return { previousState };
        },
        /**
         * If the mutation fails,
         * use the context returned from onMutate to roll back
         */
        onError: (err, data, context) => {
            queryClient.setQueryData(["formations"], context.previousState);
        },
        onSuccess: (response) => {
            const formation = response.json();
            history.push(`/formations/${formation.id}/edit`);
        },
        /**
         * Always refetch after error or success:
         */
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["formations"] });
        },
    });
}