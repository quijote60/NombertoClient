import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const inspectionTypesAdapter = createEntityAdapter({})

const initialState = inspectionTypesAdapter.getInitialState()

export const inspectionTypesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getInspectionTypes: builder.query({
            query: () => ({
                url: '/inspectiontypes',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedInspectionTypes = responseData.map(fineType => {
                    fineType.id = fineType._id
                    return fineType
                });
                return inspectionTypesAdapter.setAll(initialState, loadedInspectionTypes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'InspectionType', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'InspectionType', id }))
                    ]
                } else return [{ type: 'InspectionType', id: 'LIST' }]
            }
        }),
        addNewInspectionType: builder.mutation({
            query: initialInspectionTypeData => ({
                url: '/inspectiontypes',
                method: 'POST',
                body: {
                    ...initialInspectionTypeData,
                }
            }),
            invalidatesTags: [
                { type: 'InspectionType', id: "LIST" }
            ]
        }),
        updateInspectionType: builder.mutation({
            query: initialInspectionTypeData => ({
                url: '/inspectiontypes',
                method: 'PATCH',
                body: {
                    ...initialInspectionTypeData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'InspectionType', id: arg.id }
            ]
        }),
        deleteInspectionType: builder.mutation({
            query: ({ id }) => ({
                url: `/inspectiontypes`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'InspectionType', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetInspectionTypesQuery,
    useAddNewInspectionTypeMutation,
    useUpdateInspectionTypeMutation,
    useDeleteInspectionTypeMutation,
} = inspectionTypesApiSlice

// returns the query result object
export const selectInspectionTypesResult = inspectionTypesApiSlice.endpoints.getInspectionTypes.select()

// creates memoized selector
const selectInspectionTypesData = createSelector(
    selectInspectionTypesResult,
    inspectionTypesResult => inspectionTypesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllInspectionTypes,
    selectById: selectInspectionTypeById,
    selectIds: selectInspectionTypeIds
    // Pass in a selector that returns the inspectionTypes slice of state
} = inspectionTypesAdapter.getSelectors(state => selectInspectionTypesData(state) ?? initialState)