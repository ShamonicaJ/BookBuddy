import { createSlice } from '@reduxjs/toolkit';
import api from '../../store/api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query({
      query: () => '/users/me',
    }),
    register: builder.mutation({
      query: ({ email, password }) => ({
        url: 'users/register',
        method: 'POST',
        body: {
          email: email,
          password: password,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: 'users/login',
        method: 'POST',
        body: {
          email: email,
          password: password,
        },
      }),
    }),
    reservations: builder.query({
      query: () => '/reservations',
      providesTags: ['Reservations'],
    }),
  }),
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: window.sessionStorage.getItem('token'),
    checkedOutBooks: [],
  },
  reducers: {
    addBook: (state, action) => {
      state.checkedOutBooks.push(action.payload);
    },
    removeBook: (state, action) => {
      state.checkedOutBooks = state.checkedOutBooks.filter((book) => book.id !== action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.checkedOutBooks = [];
      window.sessionStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.register.matchFulfilled, (state, { payload }) => {
        state.token = payload.token;
        window.sessionStorage.setItem('token', payload.token);
      })
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.token = payload.token;
        window.sessionStorage.setItem('token', payload.token);
      });
  },
});

export const { useMeQuery, useRegisterMutation, useLoginMutation, useReservationsQuery, addBook, removeBook, logout } = authApi;
export const { actions } = authSlice;
export default authSlice.reducer;

