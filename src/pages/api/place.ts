import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  try {
    const place = url.searchParams.get("name");

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&key=${import.meta.env.PUBLIC_PLACES_API_KEY}&inputtype=textquery&fields=name,photos`,
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          ok: false,
        }),
        {
          status: response.status,
        },
      );
    }

    const result = await response.json();

    const photoRef = result.candidates[0].photos[0].photo_reference;

    const photoResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${import.meta.env.PUBLIC_PLACES_API_KEY}`,
    );

    return photoResponse;
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
