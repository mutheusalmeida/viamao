import MapPin from "@/assets/map-pin.svg?react";
import { useTripImage } from "@/components/hooks/use-trip-image";
import { format, isSameMonth, isSameYear } from "date-fns";
import { useEffect } from "react";
import { useTrip } from "../../hooks/use-trip";

type TripContentProps = {
  id: string;
};

export const TripContent = ({ id }: TripContentProps) => {
  const { data } = useTrip(id);
  const { data: image } = useTripImage(data?.destination);

  useEffect(() => {
    if (data) {
      document.title = `ViaMão - ${data.title}`;
    }
  }, [data]);

  if (!data) {
    return (
      <p className="text-neutral-500 text-sm font-medium text-center">
        Loading...
      </p>
    );
  }

  return (
    <div className="flex flex-col space-y-4 font-medium">
      {image && (
        <img
          src={URL.createObjectURL(image)}
          className="w-full h-36 rounded-xl object-cover"
        />
      )}

      <h1 className="text-4xl font-bold">{data.title}</h1>

      <span className="text-sm !mt-2 gap-1 flex items-center">
        <MapPin className="w-3.5 h-3.5" /> {data.destination}
      </span>

      <p className="text-sm !mt-2 text-neutral-500">
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

      <p className="font-semibold text-muted-foreground">{data.description}</p>
    </div>
  );
};
