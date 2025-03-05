import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const paymentCategoriesAdapter = createEntityAdapter({})

const initialState = paymentCategoriesAdapter.getInitialState()

export const paymentCategoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPaymentCategories: builder.query({
            query: () => ({
                url: '/paymentcategories',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedPaymentCategories = responseData.map(property => {
                    property.id = property._id
                    return property
                });
                return paymentCategoriesAdapter.setAll(initialState, loadedPaymentCategories)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'PaymentCategory', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'PaymentCategory', id }))
                    ]
                } else return [{ type: 'PaymentCategory', id: 'LIST' }]
            }
        }),
        addNewPaymentCategory: builder.mutation({
            query: initialPaymentCategoryData => ({
                url: '/paymentcategories',
                method: 'POST',
                body: {
                    ...initialPaymentCategoryData,
                }
            }),
            invalidatesTags: [
                { type: 'PaymentCategory', id: "LIST" }
            ]
        }),
        updatePaymentCategory: builder.mutation({
            query: initialPaymentCategoryData => ({
                url: '/paymentcategories',
                method: 'PATCH',
                body: {
                    ...initialPaymentCategoryData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'PaymentCategory', id: arg.id }
            ]
        }),
        deletePaymentCategory: builder.mutation({
            query: ({ id }) => ({
                url: `/paymentcategories`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'PaymentCategory', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetPaymentCategoriesQuery,
    useAddNewPaymentCategoryMutation,
    useUpdatePaymentCategoryMutation,
    useDeletePaymentCategoryMutation,
} = paymentCategoriesApiSlice

// returns the query result object
export const selectPaymentCategoriesResult = paymentCategoriesApiSlice.endpoints.getPaymentCategories.select()

// creates memoized selector
const selectPaymentCategoriesData = createSelector(
    selectPaymentCategoriesResult,
    paymentCategoriesResult => paymentCategoriesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPaymentCategories,
    selectById: selectPaymentCategoryById,
    selectIds: selectPaymentCategoryIds
    // Pass in a selector that returns the paymentCategories slice of state
} = paymentCategoriesAdapter.getSelectors(state => selectPaymentCategoriesData(state) ?? initialState)