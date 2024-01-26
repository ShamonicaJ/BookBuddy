import api from '../../store/api'

export const booksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/books'
        }),
        getBookById: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: ['Books']
        }),
        reserve: builder.mutation({
            query: (id) => ({
              url: `/books/${id}`,
              method: 'PATCH',
              body: {
                available: false
              }
            }),
            invalidatesTags: ['Reservations', 'Books']
        }),
        return: builder.mutation({
            query: (id) => ({
                url: `/reservations/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Reservations', 'Books']
        })
    })
})

export const { useGetBooksQuery, useGetBookByIdQuery, useReserveMutation, useReturnMutation } = booksApi