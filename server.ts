import { app } from "./app.ts";
import { PORT } from "./src/config/main.ts";

await app.listen(`:${PORT}`);
