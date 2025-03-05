import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const finesAdapter = createEntityAdapter({})

const initialState = finesAdapter.getInitialState()

export const finesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFines: builder.query({
            query: () => ({
                url: '/fines',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedFines = responseData.map(expense => {
                    expense.id = expense._id
                    return expense
                });
                return finesAdapter.setAll(initialState, loadedFines)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Fine', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Fine', id }))
                    ]
                } else return [{ type: 'Fine', id: 'LIST' }]
            }
        }),
        addNewFine: builder.mutation({
            query: initialFineData => ({
                url: '/fines',
                method: 'POST',
                body: {
                    ...initialFineData,
                }
            }),
            invalidatesTags: [
                { type: 'Fine', id: "LIST" }
            ]
        }),
        updateFine: builder.mutation({
            query: initialFineData => ({
                url: '/fines',
                method: 'PATCH',
                body: {
                    ...initialFineData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Fine', id: arg.id }
            ]
        }),
        deleteFine: builder.mutation({
            query: ({ id }) => ({
                url: `/fines`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Fine', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetFinesQuery,
    useAddNewFineMutation,
    useUpdateFineMutation,
    useDeleteFineMutation,
} = finesApiSlice

// returns the query result object
export const selectFinesResult = finesApiSlice.endpoints.getFines.select()

// creates memoized selector
const selectFinesData = createSelector(
    selectFinesResult,
    finesResult => finesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllFines,
    selectById: selectFineById,
    selectIds: selectFineIds
    // Pass in a selector that returns the fines slice of state
} = finesAdapter.getSelectors(state => selectFinesData(state) ?? initialState)