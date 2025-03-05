import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const propertiesAdapter = createEntityAdapter({})

const initialState = propertiesAdapter.getInitialState()

export const propertiesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProperties: builder.query({
            query: () => ({
                url: '/properties',
                validateStatus: (response, result) =>{
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedProperties = responseData.map(property => {
                    property.id = property._id
                    return property
                });
                return propertiesAdapter.setAll(initialState, loadedProperties)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Property', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Property', id }))
                    ]
                } else return [{ type: 'Property', id: 'LIST' }]
            }
        }),
        addNewProperty: builder.mutation({
            query: initialPropertyData => ({
                url: '/properties',
                method: 'POST',
                body: {
                    ...initialPropertyData,
                }
            }),
            invalidatesTags: [
                { type: 'Property', id: "LIST" }
            ]
        }),
        updateProperty: builder.mutation({
            query: initialPropertyData => ({
                url: '/properties',
                method: 'PATCH',
                body: {
                    ...initialPropertyData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Property', id: arg.id }
            ]
        }),
        deleteProperty: builder.mutation({
            query: ({ id }) => ({
                url: `/properties`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Property', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetPropertiesQuery,
    useAddNewPropertyMutation,
    useUpdatePropertyMutation,
    useDeletePropertyMutation,
} = propertiesApiSlice

// returns the query result object
export const selectPropertiesResult = propertiesApiSlice.endpoints.getProperties.select()

// creates memoized selector
const selectPropertiesData = createSelector(
    selectPropertiesResult,
    propertiesResult => propertiesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProperties,
    selectById: selectPropertyById,
    selectIds: selectPropertyIds
    // Pass in a selector that returns the properties slice of state
} = propertiesAdapter.getSelectors(state => selectPropertiesData(state) ?? initialState)