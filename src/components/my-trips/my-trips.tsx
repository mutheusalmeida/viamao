import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MyTripsList } from "./my-trips-list";

const queryClient = new QueryClient();

export const MyTrips = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MyTripsList />
    </QueryClientProvider>
  );
};
