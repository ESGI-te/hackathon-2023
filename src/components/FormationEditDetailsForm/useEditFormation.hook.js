import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useEditFormation(formationId) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (formData) => {
			const response = await fetch("/api/formations", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			return response.json();
		},
		onMutate: async (data) => {
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
			queryClient.setQueryData(["formation", formationId], context.previousState);
		},
		onSuccess: () => {
		},
		/**
		 * Always refetch after error or success:
		 */
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["formation", formationId] });
		},
	});
}
