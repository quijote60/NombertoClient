import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const inspectionsAdapter = createEntityAdapter({})

const initialState = inspectionsAdapter.getInitialState()

export const inspectionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getInspections: builder.query({
            query: () => ({
                url: '/inspections',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedInspections = responseData.map(inspection => {
                    inspection.id = inspection._id
                    return inspection
                });
                return inspectionsAdapter.setAll(initialState, loadedInspections)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Inspection', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Inspection', id }))
                    ]
                } else return [{ type: 'Inspection', id: 'LIST' }]
            }
        }),
        addNewInspection: builder.mutation({
            query: initialInspectionData => ({
                url: '/inspections',
                method: 'POST',
                body: {
                    ...initialInspectionData,
                }
            }),
            invalidatesTags: [
                { type: 'Inspection', id: "LIST" }
            ]
        }),
        updateInspection: builder.mutation({
            query: initialInspectionData => ({
                url: '/inspections',
                method: 'PATCH',
                body: {
                    ...initialInspectionData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Inspection', id: arg.id }
            ]
        }),
        deleteInspection: builder.mutation({
            query: ({ id }) => ({
                url: `/inspections`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Inspection', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetInspectionsQuery,
    useAddNewInspectionMutation,
    useUpdateInspectionMutation,
    useDeleteInspectionMutation,
} = inspectionsApiSlice

// returns the query result object
export const selectInspectionsResult = inspectionsApiSlice.endpoints.getInspections.select()

// creates memoized selector
const selectInspectionsData = createSelector(
    selectInspectionsResult,
    inspectionsResult => inspectionsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllInspections,
    selectById: selectInspectionById,
    selectIds: selectInspectionIds
    // Pass in a selector that returns the inspections slice of state
} = inspectionsAdapter.getSelectors(state => selectInspectionsData(state) ?? initialState)