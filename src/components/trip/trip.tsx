import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { format } from "date-fns";
import type { TripType } from "trip";

type TripProps = {
  id: string;
};

type TripContentProps = {
  id: string;
};

const queryClient = new QueryClient();

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

export const TripContent = ({ id }: TripContentProps) => {
  const { data } = useTrip(id);

  if (!data) return;

  return (
    <div className="flex flex-col space-y-4 font-medium">
      <h1 className="text-4xl font-bold">{data.title}</h1>

      <p className="text-sm">{data.destination}</p>

      <p className="text-sm">
        {format(data.start_date, "PPP")} - {format(data.end_date, "PPP")}
      </p>

      <p className="font-semibold text-muted-foreground">{data.description}</p>
    </div>
  );
};

export const Trip = ({ id }: TripProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TripContent id={id} />
    </QueryClientProvider>
  );
};
