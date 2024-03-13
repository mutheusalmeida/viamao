declare module "session" {
  export type User = {
    email: string;
  };

  export type SessionType = {
    token: string;
    user: User;
  };
}
