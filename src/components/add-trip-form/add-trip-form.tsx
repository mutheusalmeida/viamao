import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";

export const AddTripForm = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    destination: z.string().min(1, "Destination is required"),
    start_date: z.date({
      required_error: "Start date is required",
    }),
    end_date: z.date({
      required_error: "End date is required",
    }),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      destination: "",
      start_date: undefined,
      end_date: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const formatedData = {
      ...data,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
    };

    setIsLoading(true);

    const response = await fetch("/api/trips", {
      method: "POST",
      body: JSON.stringify(formatedData),
    });

    const result = await response.json();

    if (!result.ok) {
      if (result.status === 401) {
        window.location.replace("/");
      }

      setError(result.message);
      setIsLoading(false);

      return;
    }

    setIsLoading(false);
    form.reset();
    window.location.replace(`/my-trips/${result.data.id}`);
  };

  return (
    <div>
      <h1 className="text-center mb-12 font-bold text-4xl">My next trip</h1>

      {error && (
        <p className="text-sm mb-5 text-center font-medium text-destructive">
          {error}
        </p>
      )}

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="Enter a title" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Textarea
                      className="resize-none"
                      {...field}
                      placeholder="Enter a description"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="e.g. Porto, Portugal" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start date</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-medium hover:bg-white hover:text-muted-foreground",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a start date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End date</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-medium hover:bg-white hover:text-muted-foreground",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick an end date</span>
                            )}
                            <CalendarIcon className="ml-auto min-w-4 h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <= addDays(new Date(), 1) ||
                            date <= form.watch("start_date")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              size="lg"
              type="submit"
              disabled={isLoading}
              className="w-full gap-2 disabled:opacity-75"
            >
              {isLoading ? <>Loading...</> : <>Continue</>}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
