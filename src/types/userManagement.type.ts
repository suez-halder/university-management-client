import {
    TAcademicDepartment,
    TAcademicFaculty,
} from "./academicManagement.type";

type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
};

type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

type TName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type TStudentData = {
    academicDepartment: TAcademicDepartment;
    academicFaculty: TAcademicFaculty;
    admissionSemester: string;
    bloodGroup: string;
    contactNo: string;
    dateOfBirth: string;
    email: string;
    emergencyContactNo: string;
    fullName: string;
    gender: string;
    guardian: TGuardian;
    id: string;
    isDeleted: boolean;
    localGuardian: TLocalGuardian;
    name: TName;
    permanentAddress: string;
    presentAddress: string;
    profileImg: string;
    user: string;
    __v: number;
    _id: string;
};
