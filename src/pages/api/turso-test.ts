import type { APIRoute } from "astro";
import { turso } from "../../lib/turso";

export const prerender = false;

export const GET: APIRoute = async () => {
    const result = await turso.execute(
        "SELECT NumT, Appear, Power, name FROM Seasons ORDER BY NumT ASC LIMIT 5"
    );
    return new Response(JSON.stringify(result.rows), {
        status: 200,
        headers: 
            { 
                "Content-Type": "application/json", 
            },
    });
};