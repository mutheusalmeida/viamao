import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  const data = await request.json();

  try {
    const response = await fetch("http://192.168.0.3:8080/api/v1/auth", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();

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

    const session = await response.json();

    cookies.set("session", JSON.stringify(session), {
      path: "/",
      httpOnly: true,
    });

    return new Response(
      JSON.stringify({
        ok: true,
      }),
      {
        status: 200,
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
