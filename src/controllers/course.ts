import courses from "../mock.ts";
import Course from "../models/course.ts";

export const getCourses = ({ response }: { response: any }) => {
    response.body = courses;
};

export const addCourses = async ({
    request,
    response,
}: {
    request: any;
    response: any;
}) => {
    const body = await request.body();
    const course: Course = body.value;

    courses.push(course);
    response.body = {
        courseAdded: "SUCCESS",
    };
    response.status = 200;
};
