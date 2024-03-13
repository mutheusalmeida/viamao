import { getQueryKey } from "@/js/utils";
import {
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import type { TripType } from "trip";
import type { KeyParams, PageableType } from "util";

type Params = { pageParam: number };
type Response = { data: PageableType<TripType> };

const getTrips = ({ pageParam = 0 }: Params): Promise<Response> =>
  fetch(`/api/trips?page=${pageParam}`).then((res) => {
    if (res.status === 401) {
      window.location.replace("/");
    }

    return res.json();
  });

export const useMyTrips = () => {
  const queryKey = getQueryKey("trips");
  const config: UseInfiniteQueryOptions<
    Response,
    unknown,
    PageableType<TripType>,
    Response,
    Array<string | KeyParams>,
    number
  > = {
    queryKey,
    getNextPageParam: (lastPage) =>
      lastPage.data.last ? undefined : lastPage.data.number + 1,
    initialPageParam: 0,
  };

  return useInfiniteQuery({
    ...config,
    queryFn: ({ pageParam }) => getTrips({ pageParam }),
    select: (data) => ({
      ...data,
      pages: data.pages.flatMap((page) => page.data),
    }),
  });
};
