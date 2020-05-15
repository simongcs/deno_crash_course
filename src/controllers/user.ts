import user from "../models/user.ts";
import User from "../models/user.ts";
import { v4 as uuid } from "https://deno.land/std/uuid/mod.ts";
import { persistData, fetchData } from "../db.ts";

type UserData = Pick<User, "name" | "age">;

export const createUser = async ({
    request,
    response,
}: {
    request: any;
    response: any;
}) => {
    if (!request.hasBody) {
        response.status = 400;
        response.body = { msg: "Invalid user data" };
        return;
    }
    const {
        value: { name, age },
    } = await request.body();

    if (!name || !age) {
        response.status = 422;
        response.body = { msg: "incorrect user data." };
        return;
    }

    const users = await fetchData();

    const newUser: User = {
        id: uuid.generate(),
        name,
        age,
        created: new Date(),
    };

    await persistData([...users, newUser]);

    response.body = { msg: "User Created, userId" };
};

export const getUsers = async ({ response }: { response: any }) => {
    const users = await fetchData();
    response.body = users.sort((a, b) => a.name.localeCompare(b.name));
};

export const getUserDetails = async ({
    params,
    response,
}: {
    params: any;
    response: any;
}) => {
    const userId = params.id;
    if (!userId) {
        response.status = 400;
        response.body = { msg: "Invalid user id" };
        return;
    }

    const users = await fetchData();
    const foundUser = users.find(({ id }) => id === userId);
    if (!foundUser) {
        response.status = 404;
        response.body = { msg: `User with ID ${userId} not found` };
        return;
    }
    response.body = foundUser;
};

export const updateUser = async ({
    params,
    request,
    response,
}: {
    params: any;
    request: any;
    response: any;
}) => {
    const userId = params.id;
    if (!userId) {
        response.status = 400;
        response.body = { msg: "Invalid user id" };
        return;
    }
    if (!request.hasBody) {
        response.status = 400;
        response.body = { msg: "Invalid user data" };
        return;
    }
    const {
        value: { name, age },
    } = await request.body();
    const users = await fetchData();
    const user = users.find(({ id }) => id === userId);
    const updatedUser = {
        ...user,
        name: name !== undefined ? name : user?.name,
        age: age !== undefined ? age : user?.age,
    };

    const filteredUsers = users.filter((user) => user.id !== userId);

    persistData([...filteredUsers, updatedUser]);
    response.body = { msg: "User updated" };
};

export const deleteUser = async ({
    params,
    response,
}: {
    params: any;
    response: any;
}) => {
    const userId = params.id;
    if (!userId) {
        response.status = 400;
        response.body = { msg: "Invalid user id" };
        return;
    }
    const users = await fetchData();

    const filteredUsers = users.filter((user) => user.id !== userId);

    persistData([...filteredUsers]);
    response.body = { msg: "User deleted" };
};
