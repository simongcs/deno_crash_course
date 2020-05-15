import Course from "./models/course.ts";

let courses: Array<Course> = [
    {
        name: "C++ advanced course",
        price: 24000,
        certification: true,
    },
    {
        name: "Deno starter course",
        price: 10000,
        certification: true,
    },
    {
        name: "React crash course",
        price: 30000,
        certification: false,
    },
];

export default courses;
