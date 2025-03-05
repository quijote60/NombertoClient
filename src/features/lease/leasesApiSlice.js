import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const leasesAdapter = createEntityAdapter({})

const initialState = leasesAdapter.getInitialState()

export const leasesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLeases: builder.query({
            query: () => ({
                url: '/leases',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedLeases = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return leasesAdapter.setAll(initialState, loadedLeases)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Lease', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Lease', id }))
                    ]
                } else return [{ type: 'Lease', id: 'LIST' }]
            }
        }),
        addNewLease: builder.mutation({
            query: initialLeaseData => ({
                url: '/leases',
                method: 'POST',
                body: {
                    ...initialLeaseData,
                }
            }),
            invalidatesTags: [
                { type: 'Lease', id: "LIST" }
            ]
        }),
        updateLease: builder.mutation({
            query: initialLeaseData => ({
                url: '/leases',
                method: 'PATCH',
                body: {
                    ...initialLeaseData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Lease', id: arg.id }
            ]
        }),
        deleteLease: builder.mutation({
            query: ({ id }) => ({
                url: `/leases`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Lease', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetLeasesQuery,
    useAddNewLeaseMutation,
    useUpdateLeaseMutation,
    useDeleteLeaseMutation,
} = leasesApiSlice

// returns the query result object
export const selectLeasesResult = leasesApiSlice.endpoints.getLeases.select()

// creates memoized selector
const selectLeasesData = createSelector(
    selectLeasesResult,
    leasesResult => leasesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllLeases,
    selectById: selectLeaseById,
    selectIds: selectLeaseIds
    // Pass in a selector that returns the leases slice of state
} = leasesAdapter.getSelectors(state => selectLeasesData(state) ?? initialState)