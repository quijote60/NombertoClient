import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const expenseTypesAdapter = createEntityAdapter({})

const initialState = expenseTypesAdapter.getInitialState()

export const expenseTypesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getExpenseTypes: builder.query({
            query: () => ({
                url: '/expensetypes',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedExpenseTypes = responseData.map(expenseType => {
                    expenseType.id = expenseType._id
                    return expenseType
                });
                return expenseTypesAdapter.setAll(initialState, loadedExpenseTypes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'ExpenseType', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'ExpenseType', id }))
                    ]
                } else return [{ type: 'ExpenseType', id: 'LIST' }]
            }
        }),
        addNewExpenseType: builder.mutation({
            query: initialExpenseTypeData => ({
                url: '/expensetypes',
                method: 'POST',
                body: {
                    ...initialExpenseTypeData,
                }
            }),
            invalidatesTags: [
                { type: 'ExpenseType', id: "LIST" }
            ]
        }),
        updateExpenseType: builder.mutation({
            query: initialExpenseTypeData => ({
                url: '/expensetypes',
                method: 'PATCH',
                body: {
                    ...initialExpenseTypeData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'ExpenseType', id: arg.id }
            ]
        }),
        deleteExpenseType: builder.mutation({
            query: ({ id }) => ({
                url: `/expensetypes`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'ExpenseType', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetExpenseTypesQuery,
    useAddNewExpenseTypeMutation,
    useUpdateExpenseTypeMutation,
    useDeleteExpenseTypeMutation,
} = expenseTypesApiSlice

// returns the query result object
export const selectExpenseTypesResult = expenseTypesApiSlice.endpoints.getExpenseTypes.select()

// creates memoized selector
const selectExpenseTypesData = createSelector(
    selectExpenseTypesResult,
    expenseTypesResult => expenseTypesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllExpenseTypes,
    selectById: selectExpenseTypeById,
    selectIds: selectExpenseTypeIds
    // Pass in a selector that returns the expenseTypes slice of state
} = expenseTypesAdapter.getSelectors(state => selectExpenseTypesData(state) ?? initialState)