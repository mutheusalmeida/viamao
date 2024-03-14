import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EditTripForm } from "./edit-trip-form";

type TripProps = {
  id: string;
};

const queryClient = new QueryClient();

export const EditTrip = ({ id }: TripProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <EditTripForm id={id} />
    </QueryClientProvider>
  );
};
