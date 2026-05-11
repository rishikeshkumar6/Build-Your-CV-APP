import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["Resume"],
  endpoints: (builder) => ({
    //user creaetion api
    createUser: builder.mutation({
      query: (payload) => ({
        url: "/user/create",
        method: "POST",
        body: payload,
      }),
    }),
    //user login api
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/user/login",
        method: "POST",
        body: payload,
      }),
    }),
    //create resume api
    createResume: builder.mutation({
      query: (payload) => ({
        url: "/resume/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Resume", id: "LIST" }],
    }),
    //update resume api
    updateResume: builder.mutation({
      query: (payload) => ({
        url: `/resume/update/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [{ type: "Resume", id: "LIST" }],
    }),
    //delete resume api
    deleteResume: builder.mutation({
      query: (id) => ({
        url: `/resume/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Resume", id: "LIST" }],
    }),
    //get resume api
    getResume: builder.query({
      query: () => ({
        url: "/resume/get",
        method: "GET",
      }),
    }),

    //get all resume api
    getAllResume: builder.query({
      query: () => ({
        url: "/resume/get_resume",
        method: "GET",
      }),
      providesTags: [{ type: "Resume", id: "LIST" }],
    }),
    //get single resume api
    getSingleResume: builder.query({
      query: (id) => ({
        url: `/resume/get_resume/${id}`,
        method: "GET",
      }),
    }),
    //get user api
    getUser: builder.query({
      query: () => ({
        url: "/user/get",
        method: "GET",
      }),
    }),
    getALLUser: builder.query({
      query: () => ({
        url: "/user/getall",
        method: "GET",
      }),
    }),

    getMessageHistory: builder.query({
      query: (id) => ({
        url: `/chat/history?with_user_id=${id}`,
        method: "GET",
      }),
    }),
    getLastMessageHistory: builder.query({
      query: () => ({
        url: `/chat/chat-list`,
        method: "GET",
      }),
    }),
    uploadResume: builder.mutation({
      query: (formData) => ({
        url: "/ai_resumes/analyze-resume",
        method: "POST",
        body: formData,
      }),
    }),
    downloadResume: builder.mutation({
      query: (data) => ({
        url: "/resume/api/download-resume",
        method: "POST",
        body: data,
      }),
    }),
    getResumeImprovement: builder.query({
      query: (id) => ({
        url: `/ai_resumes/${id}`,
        method: "GET",
      }),
    }),
    uploadResumeImprovement: builder.mutation({
      query: (payload) => ({
        url: `/ai_resumes/${payload.id}`,
        method: "PUT",
        body: payload.formData,
      }),
      invalidatesTags: [{ type: "Ai_Resume", id: "LIST" }],
    }),
    getAllResumeImprovement: builder.query({
      query: () => ({
        url: `/ai_resumes`,
        method: "GET",
      }),
      providesTags: [{ type: "Ai_Resume", id: "LIST" }],
    }),
    deleteResumeImprovement: builder.mutation({
      query: (id) => ({
        url: `/ai_resumes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Ai_Resume", id: "LIST" }],
    }),
    OauthLogin: builder.mutation({
      query: (payload) => ({
        url: "/user/oauth_login",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useLoginUserMutation,
  useCreateResumeMutation,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
  useGetResumeQuery,
  useGetSingleResumeQuery,
  useGetAllResumeQuery,
  useGetMessageHistoryQuery,
  useGetALLUserQuery,
  useGetLastMessageHistoryQuery,
  useUploadResumeMutation,
  useDownloadResumeMutation,
  useGetResumeImprovementQuery,
  useUploadResumeImprovementMutation,
  useGetAllResumeImprovementQuery,
  useDeleteResumeImprovementMutation,
  useOauthLoginMutation,
} = api;
