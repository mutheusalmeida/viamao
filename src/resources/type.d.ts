declare module "session" {
  export type SessionType = {
    token: string;
    user: {
      email: string;
    };
  };
}
