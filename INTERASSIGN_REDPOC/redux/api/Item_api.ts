import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
interface CustomError {
  status: number;
  data: {
    messge: string;
  };
}
export const ItemApi_RTK_QUERY = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      // "http://localhost:4000/api/v1",
      "https://interassignment-redpos.vercel.app/api/v1",
     
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `${token}`);
      }
      headers.set("key", "data");
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, any, {}>,

  endpoints(builder) {
    return {
      //login**********************************************************************************************
      login: builder.mutation({
        query(body) {
          return {
            url: "/auth/logIn",
            method: "POST",
            body: body,
          };
        },
      }),

      //POST ITEM
      createNewItem: builder.mutation({
        query(body) {
          return {
            url: "/item",
            method: "POST",
            body: body,
          };
        },
      }),
      //UPDATE   ITEM
      updateItem: builder.mutation({
        query({ id, body }) {
          return {
            url: `/item/${id}`,
            method: "PUT",
            body: body,
          };
        },
      }),

      //get all items
      getAllData: builder.query({
        query() {
          return {
            url: "/item",
            method: "GET",
          };
        },
      }),
      //DELETE
      deleteItemById: builder.query({
        query({ id }) {
          return {
            url: `/item/${id}`,
            method: "DELETE",
          };
        },
      }),

      //SEND mAIL
      sendMAil: builder.mutation({
        query(body) {
          return {
            url: "/send_Email",
            method: "POST",
            body: body,
          };
        },
      }),
    };
  },
});

export const {
  useLoginMutation,
  useCreateNewItemMutation,
  useUpdateItemMutation,
  useGetAllDataQuery,
  useDeleteItemByIdQuery,
  useLazyDeleteItemByIdQuery,
  useSendMAilMutation,
} = ItemApi_RTK_QUERY;
