declare module "session" {
  export type UserType = {
    email: string;
  };

  export type SessionType = {
    token: string;
    user: UserType;
  };
}

declare module "trip" {
  export type PlaceType = {
    name: string;
    description: string;
  };

  export type TripType = {
    description: string;
    destination: string;
    end_date: string;
    id: string;
    places: PlaceType[];
    start_date: string;
    title: string;
  };
}
