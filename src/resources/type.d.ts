declare module "util" {
  type KeyParams = {
    [key: string]: any;
  };

  export type PageableType<T> = {
    content: T[];
    pageable: {
      page_number: number;
      page_size: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    last: boolean;
    total_pages: number;
    total_elements: number;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    number_of_elements: number;
    first: boolean;
    empty: boolean;
  };
}

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
