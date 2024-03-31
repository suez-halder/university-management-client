import { TQueryParam, TResponseRedux } from "../../../types";
import { TStudentData } from "../../../types/userManagement.type";
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
        getAllStudent: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/students",
                    method: "GET",
                    params,
                };
            },

            transformResponse: (response: TResponseRedux<TStudentData[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
    }),
});

export const { useAddStudentMutation, useGetAllStudentQuery } =
    userManagementApi;
