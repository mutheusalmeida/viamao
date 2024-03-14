import { useQuery } from "@tanstack/react-query";
import type { TripType } from "trip";

export const useTrip = (id: string) =>
  useQuery<{ data: TripType }, Error, TripType>({
    queryKey: ["trips/trip", { id }],
    queryFn: () =>
      fetch(`/api/trips/${id}`).then((res) => {
        if (res.status === 401) {
          window.location.replace("/");
        }

        return res.json();
      }),
    select: (data) => data.data,
  });
