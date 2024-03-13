import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TripContent } from "./trip-content";

type TripProps = {
  id: string;
};

const queryClient = new QueryClient();

export const Trip = ({ id }: TripProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TripContent id={id} />
    </QueryClientProvider>
  );
};
