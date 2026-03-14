// import { createClient } from "@libsql/client";

// export const turso = createClient({
//     url: import.meta.env.TURSO_DATABASE_URL,
//     authToken: import.meta.env.TURSO_AUTH_TOKEN,
// });

import { createClient } from "@libsql/client";

console.log("URL:", import.meta.env.TURSO_DATABASE_URL);
console.log("TOKEN OK:", !!import.meta.env.TURSO_AUTH_TOKEN);

export const turso = createClient({
  url: import.meta.env.TURSO_DATABASE_URL,
  authToken: import.meta.env.TURSO_AUTH_TOKEN,
});