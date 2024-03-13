import { format } from "date-fns";
import type { TripType } from "trip";

type TripCardProps = {
  data: TripType;
};

export const TripCard = ({ data }: TripCardProps) => {
  return (
    <a href={`/my-trips/${data.id}`}>
      <div className="w-full text-sm h-max font-medium space-y-3">
        <div className="bg-neutral-400 w-full h-44 rounded-xl" />

        <h1 className="font-semibold">{data.title}</h1>

        <p className="line-clamp-2 !mt-2 text-muted-foreground">
          {data.description}
        </p>

        <p>
          <time dateTime={format(data.start_date, "yyyy/MM/dd")}>
            {format(data.start_date, "PP")}
          </time>{" "}
          -{" "}
          <time dateTime={format(data.end_date, "yyyy/MM/dd")}>
            {format(data.end_date, "PP")}
          </time>
        </p>
      </div>
    </a>
  );
};
