const env = Deno.env.toObject();
export const HOST = env.HOST || "127.0.0.1";
export const PORT = env.PORT || 4000;
export const DB_PATH = env.DB_PATH || "./src/db/user.json";
