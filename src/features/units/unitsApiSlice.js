import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const unitsAdapter = createEntityAdapter({})

const initialState = unitsAdapter.getInitialState()

export const unitsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUnits: builder.query({
            query: () => ({
                url: '/units',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedUnits = responseData.map(unit => {
                    unit.id = unit._id
                    return unit
                });
                return unitsAdapter.setAll(initialState, loadedUnits)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Unit', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Unit', id }))
                    ]
                } else return [{ type: 'Unit', id: 'LIST' }]
            }
        }),
        addNewUnit: builder.mutation({
            query: initialUnitData => ({
                url: '/units',
                method: 'POST',
                body: {
                    ...initialUnitData,
                }
            }),
            invalidatesTags: [
                { type: 'Unit', id: "LIST" }
            ]
        }),
        updateUnit: builder.mutation({
            query: initialUnitData => ({
                url: '/units',
                method: 'PATCH',
                body: {
                    ...initialUnitData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Unit', id: arg.id }
            ]
        }),
        deleteUnit: builder.mutation({
            query: ({ id }) => ({
                url: `/units`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Unit', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetUnitsQuery,
    useAddNewUnitMutation,
    useUpdateUnitMutation,
    useDeleteUnitMutation,
} = unitsApiSlice

// returns the query result object
export const selectUnitsResult = unitsApiSlice.endpoints.getUnits.select()

// creates memoized selector
const selectUnitsData = createSelector(
    selectUnitsResult,
    unitsResult => unitsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUnits,
    selectById: selectUnitById,
    selectIds: selectUnitIds
    // Pass in a selector that returns the units slice of state
} = unitsAdapter.getSelectors(state => selectUnitsData(state) ?? initialState)