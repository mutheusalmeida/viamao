import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Fragment, useEffect } from "react";
import { useMyTrips } from "../hooks/use-my-trips";
import { TripCard } from "../trip-card";

export const MyTripsList = () => {
  const { data, isPending, isFetched, hasNextPage, fetchNextPage } =
    useMyTrips();
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage]);

  console.log(data);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(226px,_1fr))] gap-8">
      {data?.pages[0]?.total_elements ? (
        data?.pages?.map((page, index) => (
          <Fragment key={index}>
            {page.content.map((trip, index) => (
              <Fragment key={trip.id}>
                <TripCard data={trip} />

                {!hasNextPage &&
                  page.last &&
                  index === page.content.length - 1 && (
                    <div className="flex justify-center h-max col-span-full text-sm text-neutral-500">
                      <span>No more trips</span>
                    </div>
                  )}
              </Fragment>
            ))}
          </Fragment>
        ))
      ) : isFetched ? (
        <div className="text-center h-max col-span-full text-sm text-neutral-500">
          No trips
        </div>
      ) : null}

      <div className="flex h-max col-span-full justify-center">
        {isPending ? (
          <div className="flex max-w-max items-center font-medium gap-2 text-sm text-neutral-500 disabled:opacity-75">
            {isPending && <>Loading...</>}
          </div>
        ) : (
          <div ref={ref} />
        )}
      </div>
    </div>
  );
};
