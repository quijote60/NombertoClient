import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const utilityTypesAdapter = createEntityAdapter({})

const initialState = utilityTypesAdapter.getInitialState()

export const utilityTypesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUtilityTypes: builder.query({
            query: () => ({
                url: '/utilitytypes',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedUtilityTypes = responseData.map(utilityType => {
                    utilityType.id = utilityType._id
                    return utilityType
                });
                return utilityTypesAdapter.setAll(initialState, loadedUtilityTypes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'UtilityType', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'UtilityType', id }))
                    ]
                } else return [{ type: 'UtilityType', id: 'LIST' }]
            }
        }),
        addNewUtilityType: builder.mutation({
            query: initialUtilityTypeData => ({
                url: '/utilitytypes',
                method: 'POST',
                body: {
                    ...initialUtilityTypeData,
                }
            }),
            invalidatesTags: [
                { type: 'UtilityType', id: "LIST" }
            ]
        }),
        updateUtilityType: builder.mutation({
            query: initialUtilityTypeData => ({
                url: '/utilitytypes',
                method: 'PATCH',
                body: {
                    ...initialUtilityTypeData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'UtilityType', id: arg.id }
            ]
        }),
        deleteUtilityType: builder.mutation({
            query: ({ id }) => ({
                url: `/utilitytypes`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'UtilityType', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetUtilityTypesQuery,
    useAddNewUtilityTypeMutation,
    useUpdateUtilityTypeMutation,
    useDeleteUtilityTypeMutation,
} = utilityTypesApiSlice

// returns the query result object
export const selectUtilityTypesResult = utilityTypesApiSlice.endpoints.getUtilityTypes.select()

// creates memoized selector
const selectUtilityTypesData = createSelector(
    selectUtilityTypesResult,
    utilityTypesResult => utilityTypesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUtilityTypes,
    selectById: selectUtilityTypeById,
    selectIds: selectUtilityTypeIds
    // Pass in a selector that returns the utilityTypes slice of state
} = utilityTypesAdapter.getSelectors(state => selectUtilityTypesData(state) ?? initialState)