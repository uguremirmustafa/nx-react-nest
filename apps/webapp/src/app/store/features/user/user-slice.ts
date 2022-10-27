import { User } from '@devugur/shared-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../../hooks';

const userKey = 'devugur_active_user';

export const initialState: User = {
  email: '',
  name: '',
  avatar: '',
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: getLocalUser(),
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const activeUser = action.payload;
      localStorage.setItem(userKey, JSON.stringify(activeUser));
      return activeUser;
    },
    deleteUser: (state) => {
      localStorage.setItem(userKey, JSON.stringify(initialState));
      return initialState;
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;

export const useUser = () => {
  const user = useAppSelector((state) => state.user);
  return user;
};

function getLocalUser(): User {
  try {
    const localUser = localStorage.getItem(userKey);
    if (localUser) return JSON.parse(localUser) ?? initialState;

    return initialState;
  } catch (error) {
    console.error(error);
    return initialState;
  }
}
