
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { TMeta } from "@/types";




export const employeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEmployee: build.mutation({
      query: (data) => ({
        url: "/user/create-employee",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.employee],
    }),
    getAllEmployees: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/employee",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IEmployee[], meta: TMeta) => {
        return {
          employees: response,
          meta,
        };
      },
      providesTags: [tagTypes.employee],
    }),

    deleteEmployees: build.mutation({
      query: (id) => ({
        url: `/employee/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.employee],
    }),
    //get single doctor
    getEmployee: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/employee/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.employee],
    }),
    // update a doctor
    updateEmployee: build.mutation({
      query: (data) => ({
        url: `/employee/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.employee],
    }),
  }),
});

export const {
useCreateEmployeeMutation,
useGetAllEmployeesQuery,
useGetEmployeeQuery,
useUpdateEmployeeMutation,
useDeleteEmployeesMutation
} = employeeApi;