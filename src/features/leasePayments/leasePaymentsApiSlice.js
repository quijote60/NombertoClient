import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const leasePaymentsAdapter = createEntityAdapter({})

const initialState = leasePaymentsAdapter.getInitialState()

export const leasePaymentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLeasePayments: builder.query({
            query: () => ({
                url: '/leasepayments',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedLeasePayments = responseData.map(leasePayment => {
                    leasePayment.id = leasePayment._id
                    return leasePayment
                });
                return leasePaymentsAdapter.setAll(initialState, loadedLeasePayments)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'LeasePayment', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'LeasePayment', id }))
                    ]
                } else return [{ type: 'LeasePayment', id: 'LIST' }]
            }
        }),
        addNewLeasePayment: builder.mutation({
            query: initialLeasePaymentData => ({
                url: '/leasepayments',
                method: 'POST',
                body: {
                    ...initialLeasePaymentData,
                }
            }),
            invalidatesTags: [
                { type: 'LeasePayment', id: "LIST" }
            ]
        }),
        updateLeasePayment: builder.mutation({
            query: initialLeasePaymentData => ({
                url: '/leasepayments',
                method: 'PATCH',
                body: {
                    ...initialLeasePaymentData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'LeasePayment', id: arg.id }
            ]
        }),
        deleteLeasePayment: builder.mutation({
            query: ({ id }) => ({
                url: `/leasepayments`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'LeasePayment', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetLeasePaymentsQuery,
    useAddNewLeasePaymentMutation,
    useUpdateLeasePaymentMutation,
    useDeleteLeasePaymentMutation,
} = leasePaymentsApiSlice

// returns the query result object
export const selectLeasePaymentsResult = leasePaymentsApiSlice.endpoints.getLeasePayments.select()

// creates memoized selector
const selectLeasePaymentsData = createSelector(
    selectLeasePaymentsResult,
    leasePaymentsResult => leasePaymentsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllLeasePayments,
    selectById: selectLeasePaymentById,
    selectIds: selectLeasePaymentIds
    // Pass in a selector that returns the leasePayments slice of state
} = leasePaymentsAdapter.getSelectors(state => selectLeasePaymentsData(state) ?? initialState)