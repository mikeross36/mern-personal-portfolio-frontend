import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://vladimir-monarov-portfolio-api.onrender.com",
  credentials: "include",
  prepareHeaders: (headers) => {
    if (!headers.has("Access-Control-Allow-Origin")) {
      headers.set(
        "Access-Control-Allow-Origin",
        "https://vladimir-monarov-portfolio.onrender.com"
      );
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
