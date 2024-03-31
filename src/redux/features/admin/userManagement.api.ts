import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //! Create Student
        addStudent: builder.mutation({
            query: (data) => ({
                url: "/users/create-student",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useAddStudentMutation } = userManagementApi;
