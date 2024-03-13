import type { APIRoute } from "astro";
import type { SessionType } from "session";

export const GET: APIRoute = async ({ params, cookies }) => {
  const id = params.id;

  try {
    const session = cookies.get("session");

    if (session?.value) {
      const sessionData: SessionType = session.json();

      const response = await fetch(
        `${import.meta.env.PUBLIC_API_BASE_URL}/trips/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionData.token}`,
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();

        if (response.status === 401) {
          cookies.delete("session", {
            path: "/",
          });
        }

        return new Response(
          JSON.stringify({
            ok: false,
            message: data.error,
          }),
          {
            status: response.status,
          },
        );
      }

      const trip = await response.json();

      return new Response(
        JSON.stringify({
          ok: true,
          data: trip,
        }),
        {
          status: 200,
        },
      );
    }

    return new Response(
      JSON.stringify({
        ok: false,
        status: 401,
      }),
      {
        status: 401,
      },
    );
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Something went wrong.",
      }),
      {
        status: 500,
      },
    );
  }
};
