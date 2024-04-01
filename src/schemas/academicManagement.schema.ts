import { z } from "zod";

export const academicSemesterSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
    year: z.string({
        required_error: "Year is required",
    }),
    startMonth: z.string({
        required_error: "Start month is required",
    }),
    endMonth: z.string({
        required_error: "End month is required",
    }),
});

export const academicFacultySchema = z.object({
    name: z.string({
        required_error: "Faculty name is required",
    }),
});

export const academicDepartmentSchema = z.object({
    name: z.string({
        required_error: "Department name is required",
    }),
    academicFaculty: z.string({
        required_error: "Academic faculty is required",
    }),
});

// export const semesterRegistrationSchema = z.object({
//     academicSemester: z.string({
//         required_error: "Academic semester is required",
//     }),
//     status: z.string({
//         required_error: "Status is required",
//     }),
//     // startDate: z.string({
//     //     required_error: "Start date is required",
//     // }),
//     // endDate: z.string({
//     //     required_error: "End date is required",
//     // }),
//     minCredit: z.number({
//         required_error: "Minimum credit is required",
//     }),
//     maxCredit: z.number({
//         required_error: "Maximum credit is required",
//     }),
// });
