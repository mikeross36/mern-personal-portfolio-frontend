import { apiSlice } from "../../app/api/apiSlice";
import { logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/users/register-user",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/users/login-user",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/api/v1/users/logout-user",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFullfiled }) {
        try {
          const { data } = await queryFullfiled;
          console.log(data);
          dispatch(logOut());
          const timer = setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
          return () => {
            clearTimeout(timer);
          };
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApiSlice;
