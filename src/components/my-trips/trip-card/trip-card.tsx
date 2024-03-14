import { LikeIcon } from "@/assets/like-icon";
import MapPin from "@/assets/map-pin.svg?react";
import { useTripImage } from "@/components/hooks/use-trip-image";
import { useRemoveTrip } from "@/components/trip/hooks/use-remove-trip";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format, isSameMonth, isSameYear } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import type { TripType } from "trip";

type TripCardProps = {
  data: TripType;
};

export const TripCard = ({ data }: TripCardProps) => {
  const { data: image } = useTripImage(data.destination);
  const { mutate } = useRemoveTrip();

  return (
    <div className="relative">
      <a href={`/my-trips/${data.id}`} className="absolute inset-0" />

      <Button
        variant="ghost"
        className="absolute z-10 hover:scale-110 hover:bg-transparent h-max top-3 right-4 p-0"
      >
        <LikeIcon />
      </Button>

      <div className="w-full text-sm h-max font-medium space-y-3">
        <div className="bg-neutral-400 relative w-full overflow-hidden h-44 rounded-xl">
          <a href={`/my-trips/${data.id}`}>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Place image"
                className="w-full h-full object-cover"
              />
            )}
          </a>

          <div className="h-7 px-2 left-2 bottom-2 flex items-center bg-white rounded-full absolute text-sm font-medium gap-1">
            <MapPin className="w-4 h-4 fill-primary" />

            <span className="line-clamp-1">{data.destination}</span>
          </div>
        </div>

        <div className="relative">
          <a href={`/my-trips/${data.id}`}>
            <h1 className="font-semibold">{data.title}</h1>
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="absolute z-10 right-2 -top-1 p-1 h-max"
                variant="ghost"
              >
                <EllipsisVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-svw max-w-24">
              <DropdownMenuLabel className="text-neutral-500 text-xs">
                Options
              </DropdownMenuLabel>

              <DropdownMenuItem className="cursor-pointer font-medium">
                <a href={`/my-trips/${data.id}/edit`} className="w-full">
                  Edit
                </a>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer text-destructive hover:!text-destructive font-medium"
                onClick={() => mutate({ id: data.id })}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
    </div>
  );
};
