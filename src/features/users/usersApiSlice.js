import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users/update-user-profile",
        method: "PATCH",
        body: {
          ...data,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/api/v1/users/delete-user",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const { useUpdateUserProflieMutation, useDeleteUserMutation } =
  usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data //normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserId,
  selectIds: selectUserIds,
  // pass in a selector that returns the users slice of the state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
