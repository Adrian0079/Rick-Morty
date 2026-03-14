import type { APIRoute } from "astro";
import { turso } from "../../../../src/lib/turso";

export const prerender = false;

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return new Response(
        JSON.stringify({ error: "ID inválido" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await request.json();
    const { Appear, Power, name } = body;

    if (Appear === undefined || !Power || !name) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await turso.execute({
      sql: "UPDATE Seasons SET Appear = ?, Power = ?, name = ? WHERE NumT = ?",
      args: [Appear, Power, name, id],
    });

    return new Response(
      JSON.stringify({
        message: "Registro actualizado correctamente",
        updatedId: id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "No se pudo actualizar el registro",
        details: error instanceof Error ? error.message : "Error desconocido",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return new Response(
        JSON.stringify({ error: "ID inválido" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await turso.execute({
      sql: "DELETE FROM Seasons WHERE NumT = ?",
      args: [id],
    });

    return new Response(
      JSON.stringify({
        message: "Registro eliminado correctamente",
        deletedId: id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "No se pudo eliminar el registro",
        details: error instanceof Error ? error.message : "Error desconocido",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};