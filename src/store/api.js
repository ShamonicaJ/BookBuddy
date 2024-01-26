import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api',
        prepareHeaders: (headers, { getState }) => {
            const state = getState();
            if (state.auth.token) {
            headers.set('Authorization', `Bearer ${state.auth.token}`)
            }
            return headers;
        }
    }),
    endpoints: () => ({})
})

export default api;
// 