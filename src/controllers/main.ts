export const root = ({ response }: { response: any }) => {
    response.body = { message: "Welcome to deno practice api." };
};
