
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { TMeta } from "@/types";
import { TSubStore } from "@/types/store";



export const storeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSubStore: build.mutation({
      query: (data) => ({
        url: "/user/create-sub-store",
        method: "POST",
       
        data,
      }),
      invalidatesTags: [tagTypes.store],
    }),
    createMainStore: build.mutation({
      query: (data) => ({
        url: "/user/create-sub-store",
        method: "POST",
       
        data,
      }),
      invalidatesTags: [tagTypes.store],
    }),
    getAllSubStore: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/sub-store",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: TSubStore[], meta: TMeta) => {
        return {
          stores: response,
          meta,
        };
      },
      providesTags: [tagTypes.store],
    }),

    softDeleteSubStore: build.mutation({
      query: (id) => ({
        url: `/sub-store/soft-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.store],
    }),
    //get single doctor
    getSingleSubStore: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/sub-store/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.store],
    }),
    // update a doctor
    updateSubStore: build.mutation({
      query: (data) => ({
        url: `/sub-store/update/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.store,tagTypes.user],
    }),
  }),
});

export const {
useCreateSubStoreMutation,
useGetAllSubStoreQuery,
useGetSingleSubStoreQuery,
useSoftDeleteSubStoreMutation,
useUpdateSubStoreMutation
} = storeApi;