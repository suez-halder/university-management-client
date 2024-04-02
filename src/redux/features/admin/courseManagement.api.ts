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
            invalidatesTags: ["semester"],
        }),

        getAllRegisteredSemester: builder.query({
            query: () => {
                return {
                    url: "/semester-registration",
                    method: "GET",
                };
            },

            providesTags: ["semester"],

            transformResponse: (
                response: TResponseRedux<TSemesterRegistration[]>
            ) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),

        updateRegisteredSemester: builder.mutation({
            query: (args) => ({
                url: `/semester-registration/${args.id}`,
                method: "PATCH",
                body: args.data,
            }),
            invalidatesTags: ["semester"],
        }),
    }),
});

export const {
    useAddSemesterRegistrationMutation,
    useGetAllRegisteredSemesterQuery,
    useUpdateRegisteredSemesterMutation,
} = courseManagementApi;
