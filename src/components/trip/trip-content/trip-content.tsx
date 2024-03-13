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

      <p className="text-sm !mt-2">{data.destination}</p>

      <p className="text-sm !mt-2 text-neutral-500">
        <time dateTime={format(data.start_date, "yyyy/MM/dd")}>
          {format(data.start_date, "PP")}
        </time>{" "}
        -{" "}
        <time dateTime={format(data.end_date, "yyyy/MM/dd")}>
          {format(data.end_date, "PP")}
        </time>
      </p>

      <p className="font-semibold text-muted-foreground">{data.description}</p>
    </div>
  );
};
