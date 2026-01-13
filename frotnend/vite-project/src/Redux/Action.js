import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000",
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (payload) => ({
        url: "/user/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getuser"],
    }),
    getUser: builder.query({
      query: () => ({
        url: "/user/get",
        method: "GET",
      }),
      providesTags: ["getuser"],
    }),
  }),
});

export const { useCreateUserMutation, useGetUserQuery } = api;
