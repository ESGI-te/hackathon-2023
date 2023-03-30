import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddShow(lessonId) {
	const queryClient = useQueryClient();

	if (!lessonId) throw new Error("A lessonId must be provided to useAddShow");

	return useMutation({
		mutationFn: async (formData) => {
			const response = await fetch("/api/quizz", {
				method: "POST",
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
			await queryClient.cancelQueries({ queryKey: ["lesson"] });

			// Snapshot the previous value
			const previousState = queryClient.getQueryData(["lesson"]);

			// Optimistically update to the new value
			queryClient.setQueryData(["lesson"], () => data);

			// Return a context object with the snapshotted value
			return { previousState };
		},
		/**
		 * If the mutation fails,
		 * use the context returned from onMutate to roll back
		 */
		onError: (err, data, context) => {
			queryClient.setQueryData(["lesson"], context.previousState);
		},
		onSuccess: (response) => {},
		/**
		 * Always refetch after error or success:
		 */
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["lesson", lessonId] });
		},
	});
}
