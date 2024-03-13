import { useQuery } from "@tanstack/react-query";

export const useTripImage = (place?: string) =>
  useQuery({
    queryKey: ["trip/trip-image", { place }],
    queryFn: () =>
      fetch(`/api/place?name=${place}`).then((res) => {
        return res.blob();
      }),
    enabled: !!place,
  });
