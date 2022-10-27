import { RegisterDto, RegisterResponse, User } from '@devugur/shared-types';
import { appApi } from '../../services/api';
import { deleteUser, initialState, setUser } from '../user';

interface Credentials {
  password: string;
  email: string;
}

interface Tokens {
  accessToken: string;
}

export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => 'auth/me',
      providesTags: ['User'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ ...data, loggedIn: true }));
        } catch (error) {
          dispatch(setUser(initialState));
          console.log(error);
        }
      },
    }),
    register: builder.mutation<RegisterResponse, RegisterDto>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
      // invalidatesTags: ['User'],
      // async onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(setUser({ ...data.user, loggedIn: true }));
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
    }),
    login: builder.mutation<{ accessToken: string; user: User }, Credentials>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ ...data.user, loggedIn: true }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: builder.mutation<User, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(deleteUser());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refresh: builder.query<Tokens, void>({
      query: () => ({
        url: 'auth/refresh',
        method: 'GET',
      }),
    }),
    getUsers: builder.query<Tokens, void>({
      query: () => ({
        url: 'users/with-addresses',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});
export const {
  useLogoutMutation,
  useLoginMutation,
  useGetProfileQuery,
  useGetUsersQuery,
  useRegisterMutation,
} = authApi;
