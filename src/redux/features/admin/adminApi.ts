
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { TMeta } from "@/types";
import { IAdmin } from "@/types/admin";



export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmin: build.mutation({
      query: (data) => ({
        url: "/user/create-admin",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    getAllAdmins: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/admin",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IAdmin[], meta: TMeta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),

    deleteAdmins: build.mutation({
      query: (id) => ({
        url: `/admin/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    //get single doctor
    getAdmin: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/admin/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    // update a doctor
    updateAdmin: build.mutation({
      query: (data) => ({
        url: `/admin/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.admin,tagTypes.user],
    }),
  }),
});

export const {
useCreateAdminMutation,
useGetAllAdminsQuery,
useGetAdminQuery,
useUpdateAdminMutation,
useDeleteAdminsMutation
} = adminApi;