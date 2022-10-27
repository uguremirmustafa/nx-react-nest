import { baseUrl } from '@devugur/utilities';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { initialState, setUser } from '../features/user';

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions);
    console.log('refreshResult', refreshResult);
    if (refreshResult.data) {
      // store the new token
      api.dispatch(
        setUser({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...refreshResult.data?.user,
          loggedIn: true,
        })
      );
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setUser(initialState));
    }
  }
  return result;
};

export const appApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['User', 'Tokens'],
  refetchOnMountOrArgChange: true,
});
