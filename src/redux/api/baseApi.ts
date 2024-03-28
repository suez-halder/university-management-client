import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("authorization", `${token}`);
        }

        return headers;
    },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        // Send refresh token
        console.log("Sending refresh token");

        const res = await fetch(
            "http://localhost:3000/api/v1/auth/refresh-token",
            {
                method: "POST",
                credentials: "include",
            }
        );

        const data = await res.json();

        console.log(data);

        const user = (api.getState() as RootState).auth.user;

        api.dispatch(
            setUser({
                user,
                token: data.data.accessToken,
            })
        );
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
});
