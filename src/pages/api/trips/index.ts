import type { APIRoute } from "astro";
import type { SessionType } from "session";

export const POST: APIRoute = async ({ request, cookies }) => {
  const data = await request.json();

  try {
    const session = cookies.get("session");

    if (session?.value) {
      const sessionData: SessionType = session.json();

      const response = await fetch(
        `${import.meta.env.PUBLIC_API_BASE_URL}/trips`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
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
            status: response.status,
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

export const GET: APIRoute = async ({ cookies, url }) => {
  try {
    const session = cookies.get("session");
    const search = url.search;

    if (session?.value) {
      const sessionData: SessionType = session.json();

      const response = await fetch(
        `${import.meta.env.PUBLIC_API_BASE_URL}/trips${search}`,
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
