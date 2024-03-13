import MapPin from "@/assets/map-pin.svg?react";
import { format, isSameMonth, isSameYear } from "date-fns";
import type { TripType } from "trip";

type TripCardProps = {
  data: TripType;
};

export const TripCard = ({ data }: TripCardProps) => {
  return (
    <a href={`/my-trips/${data.id}`}>
      <div className="w-full text-sm h-max font-medium space-y-3">
        <div className="bg-neutral-400 relative w-full h-44 rounded-xl">
          <div className="h-7 px-2 left-2 bottom-2 flex items-center bg-white rounded-full absolute text-sm font-medium gap-1">
            <MapPin className="w-4 h-4 fill-primary" />

            {data.destination}
          </div>
        </div>

        <h1 className="font-semibold">{data.title}</h1>

        <p className="line-clamp-2 !mt-2 text-muted-foreground">
          {data.description}
        </p>

        <p className="!mt-2">
          {isSameYear(data.start_date, data.end_date) ? (
            <time dateTime={format(data.start_date, "yyyy/MM/dd")}>
              {format(data.start_date, "MMM dd")} -{" "}
              {isSameMonth(data.start_date, data.end_date)
                ? format(data.end_date, "dd")
                : format(data.end_date, "MMM dd")}{" "}
              {format(data.end_date, "yyyy")}
            </time>
          ) : (
            <time dateTime={format(data.start_date, "yyyy/MM/dd")}>
              {format(data.start_date, "PP")} - {format(data.end_date, "PP")}
            </time>
          )}
        </p>
      </div>
    </a>
  );
};
