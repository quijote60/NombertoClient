import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const paymentTypesAdapter = createEntityAdapter({})

const initialState = paymentTypesAdapter.getInitialState()

export const paymentTypesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPaymentTypes: builder.query({
            query: () => ({
                url: '/paymenttypes',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedPaymentTypes = responseData.map(paymentType => {
                    paymentType.id = paymentType._id
                    return paymentType
                });
                return paymentTypesAdapter.setAll(initialState, loadedPaymentTypes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'PaymentType', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'PaymentType', id }))
                    ]
                } else return [{ type: 'PaymentType', id: 'LIST' }]
            }
        }),
        addNewPaymentType: builder.mutation({
            query: initialPaymentTypeData => ({
                url: '/paymenttypes',
                method: 'POST',
                body: {
                    ...initialPaymentTypeData,
                }
            }),
            invalidatesTags: [
                { type: 'PaymentType', id: "LIST" }
            ]
        }),
        updatePaymentType: builder.mutation({
            query: initialPaymentTypeData => ({
                url: '/paymenttypes',
                method: 'PATCH',
                body: {
                    ...initialPaymentTypeData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'PaymentType', id: arg.id }
            ]
        }),
        deletePaymentType: builder.mutation({
            query: ({ id }) => ({
                url: `/paymenttypes`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'PaymentType', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetPaymentTypesQuery,
    useAddNewPaymentTypeMutation,
    useUpdatePaymentTypeMutation,
    useDeletePaymentTypeMutation,
} = paymentTypesApiSlice

// returns the query result object
export const selectPaymentTypesResult = paymentTypesApiSlice.endpoints.getPaymentTypes.select()

// creates memoized selector
const selectPaymentTypesData = createSelector(
    selectPaymentTypesResult,
    paymentTypesResult => paymentTypesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPaymentTypes,
    selectById: selectPaymentTypeById,
    selectIds: selectPaymentTypeIds
    // Pass in a selector that returns the paymentTypes slice of state
} = paymentTypesAdapter.getSelectors(state => selectPaymentTypesData(state) ?? initialState)