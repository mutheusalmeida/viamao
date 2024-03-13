import { format } from "date-fns";
import { useTrip } from "../hooks/use-trip";

type TripContentProps = {
  id: string;
};

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
