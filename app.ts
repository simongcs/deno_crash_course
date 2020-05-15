import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import { getCourses, addCourses } from "./src/controllers/course.ts";
import { root } from "./src/controllers/main.ts";

import router from "./src/routes/index.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

export { app };
