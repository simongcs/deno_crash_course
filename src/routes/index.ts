import { Router } from "https://deno.land/x/oak/mod.ts";

import { root } from "../controllers/main.ts";
import { getCourses, addCourses } from "../controllers/course.ts";
import {
    createUser,
    getUsers,
    getUserDetails,
    updateUser,
    deleteUser,
} from "../controllers/user.ts";

const router = new Router();

router.get("/", root);

router.get("/courses", getCourses).post("/courses", addCourses);

router
    .post("/users", createUser)
    .get("/users", getUsers)
    .get("/users/:id", getUserDetails)
    .put("/users/:id", updateUser)
    .delete("/users/:id", deleteUser);

export default router;
