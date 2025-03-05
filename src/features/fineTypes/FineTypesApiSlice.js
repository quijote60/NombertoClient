import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const fineTypesAdapter = createEntityAdapter({})

const initialState = fineTypesAdapter.getInitialState()

export const fineTypesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFineTypes: builder.query({
            query: () => ({
                url: '/finetypes',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                console.log('API Response Data:', responseData);

                // Access the `data` property, default to empty array if undefined
                const dataArray = responseData?.data || [];

                // Ensure dataArray is an array, then map over it
                const loadedFineTypes = Array.isArray(dataArray)
                    ? dataArray.map(fineType => {
                          fineType.id = fineType._id; // Map _id to id for the adapter
                          return fineType;
                      })
                    : [];

                return fineTypesAdapter.setAll(initialState, loadedFineTypes);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'FineType', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'FineType', id }))
                    ]
                } else return [{ type: 'FineType', id: 'LIST' }]
            }
        }),
        addNewFineType: builder.mutation({
            query: initialFineTypeData => ({
                url: '/finetypes',
                method: 'POST',
                body: {
                    ...initialFineTypeData,
                }
            }),
            invalidatesTags: [
                { type: 'FineType', id: "LIST" }
            ]
        }),
        updateFineType: builder.mutation({
            query: initialFineTypeData => ({
                url: '/finetypes',
                method: 'PATCH',
                body: {
                    ...initialFineTypeData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'FineType', id: arg.id }
            ]
        }),
        deleteFineType: builder.mutation({
            query: ({ id }) => ({
                url: `/finetypes`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'FineType', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetFineTypesQuery,
    useAddNewFineTypeMutation,
    useUpdateFineTypeMutation,
    useDeleteFineTypeMutation,
} = fineTypesApiSlice

// returns the query result object
export const selectFineTypesResult = fineTypesApiSlice.endpoints.getFineTypes.select()

// creates memoized selector
const selectFineTypesData = createSelector(
    selectFineTypesResult,
    fineTypesResult => fineTypesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllFineTypes,
    selectById: selectFineTypeById,
    selectIds: selectFineTypeIds
    // Pass in a selector that returns the fineTypes slice of state
} = fineTypesAdapter.getSelectors(state => selectFineTypesData(state) ?? initialState)