import { TQueryParam, TResponseRedux } from "../../../types";
import {
    TAcademicDepartment,
    TAcademicFaculty,
    TAcademicSemester,
} from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //! Academic Semester
        getAllSemesters: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/academic-semesters",
                    method: "GET",
                    params,
                };
            },

            transformResponse: (
                response: TResponseRedux<TAcademicSemester[]>
            ) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        addAcademicSemester: builder.mutation({
            query: (data) => ({
                url: "/academic-semesters/create-academic-semester",
                method: "POST",
                body: data,
            }),
        }),
        //! Academic Faculty
        addAcademicFaculty: builder.mutation({
            query: (data) => ({
                url: "/academic-faculties/create-academic-faculty",
                method: "POST",
                body: data,
            }),
        }),
        getAllAcademicFaculties: builder.query({
            query: () => {
                return {
                    url: "/academic-faculties",
                    method: "GET",
                };
            },

            transformResponse: (
                response: TResponseRedux<TAcademicFaculty[]>
            ) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),

        //! Academic Department
        addAcademicDepartment: builder.mutation({
            query: (data) => ({
                url: "/academic-departments/create-academic-department",
                method: "POST",
                body: data,
            }),
        }),
        getAllAcademicDepartments: builder.query({
            query: () => {
                return {
                    url: "/academic-departments",
                    method: "GET",
                };
            },

            transformResponse: (
                response: TResponseRedux<TAcademicDepartment[]>
            ) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
    }),
});

export const {
    useGetAllSemestersQuery,
    useAddAcademicSemesterMutation,
    useAddAcademicFacultyMutation,
    useGetAllAcademicFacultiesQuery,
    useAddAcademicDepartmentMutation,
    useGetAllAcademicDepartmentsQuery,
} = academicManagementApi;
