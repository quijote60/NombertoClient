import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const utilitiesAdapter = createEntityAdapter({})

const initialState = utilitiesAdapter.getInitialState()

export const utilitiesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUtilities: builder.query({
            query: () => ({
                url: '/utilities',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedUtilities = responseData.map(utility => {
                    utility.id = utility._id
                    return utility
                });
                return utilitiesAdapter.setAll(initialState, loadedUtilities)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Utility', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Utility', id }))
                    ]
                } else return [{ type: 'Utility', id: 'LIST' }]
            }
        }),
        addNewUtility: builder.mutation({
            query: initialUtilityData => ({
                url: '/utilities',
                method: 'POST',
                body: {
                    ...initialUtilityData,
                }
            }),
            invalidatesTags: [
                { type: 'Utility', id: "LIST" }
            ]
        }),
        updateUtility: builder.mutation({
            query: initialUtilityData => ({
                url: '/utilities',
                method: 'PATCH',
                body: {
                    ...initialUtilityData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Utility', id: arg.id }
            ]
        }),
        deleteUtility: builder.mutation({
            query: ({ id }) => ({
                url: `/utilities`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Utility', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetUtilitiesQuery,
    useAddNewUtilityMutation,
    useUpdateUtilityMutation,
    useDeleteUtilityMutation,
} = utilitiesApiSlice

// returns the query result object
export const selectUtilitiesResult = utilitiesApiSlice.endpoints.getUtilities.select()

// creates memoized selector
const selectUtilitiesData = createSelector(
    selectUtilitiesResult,
    utilitiesResult => utilitiesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUtilities,
    selectById: selectUtilityById,
    selectIds: selectUtilityIds
    // Pass in a selector that returns the utilities slice of state
} = utilitiesAdapter.getSelectors(state => selectUtilitiesData(state) ?? initialState)