export type TAcademicSemester = {
    name: string;
    code: string;
    year: string;
    startMonth: string;
    endMonth: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type TAcademicFaculty = {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type TAcademicDepartment = {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    academicFaculty: TAcademicFaculty;
};
