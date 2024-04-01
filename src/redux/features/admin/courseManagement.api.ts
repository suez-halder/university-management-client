import { TResponseRedux, TSemesterRegistration } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //! Semester Registration
        addSemesterRegistration: builder.mutation({
            query: (data) => ({
                url: "/semester-registration/create-semester-registration",
                method: "POST",
                body: data,
            }),
        }),

        getAllRegisteredSemester: builder.query({
            query: () => {
                return {
                    url: "/semester-registration",
                    method: "GET",
                };
            },

            transformResponse: (
                response: TResponseRedux<TSemesterRegistration[]>
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
    useAddSemesterRegistrationMutation,
    useGetAllRegisteredSemesterQuery,
} = courseManagementApi;
