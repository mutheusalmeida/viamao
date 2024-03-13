import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveTrip = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string }>({
    mutationFn: ({ id }) =>
      fetch(`/api/trips/${id}`, { method: "DELETE" }).then((res) => {
        if (res.status === 401) {
          window.location.replace("/");
        }

        return res.json();
      }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};
