import type { APIRoute } from "astro";
import { turso } from "../../lib/turso";

export const prerender = false;

export const GET: APIRoute = async () => {
  const result = await turso.execute(
    "SELECT NumT, Appear, Power, name FROM Seasons ORDER BY NumT ASC"
  );

  return new Response(JSON.stringify(result.rows), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { NumT, Appear, Power, name } = body;

    if (NumT === undefined || Appear === undefined || !Power || !name) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await turso.execute({
      sql: "INSERT INTO Seasons (NumT, Appear, Power, name) VALUES (?, ?, ?, ?)",
      args: [NumT, Appear, Power, name],
    });

    return new Response(
      JSON.stringify({
        message: "Registro creado correctamente",
        data: { NumT, Appear, Power, name },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
      return new Response(
        JSON.stringify({
          error: "Ya existe un registro con ese NumT",
          details: error.message,
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Error al crear el registro",
        details: error instanceof Error ? error.message : "Error desconocido",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};