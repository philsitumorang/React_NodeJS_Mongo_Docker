import { createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import * as api from './api';

export interface IUser {
  _id?: string;
  email: string;
  name: string;
  role?: string;
  department?: string;
  salary?: number;
}

export interface UserState {
  value: Array<IUser>,
  status: 'idle' | 'loading' | 'failed';
  currentUser?: IUser,
  error: unknown
}

const initialState: UserState = {
  value: [],
  status: 'idle',
  error: null
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      getUsers: (state, action) => {
        state.value = action.payload;
      },
      setCurrent: (state, action) => {
        state.currentUser = action.payload;
      }
    }
});

export const { getUsers, setCurrent } = userSlice.actions;
export const selectAllUsers = (state: RootState) => state.users;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;

export const fetchUsers =
  (): AppThunk =>
  async (dispatch) => {
    const data = await api.getUsers();
    dispatch(getUsers(data));
  };

export const createUser = 
  (user: IUser): AppThunk =>
  async (dispatch) => {
    await api.createUser(user);
    const data = await api.getUsers();
    dispatch(getUsers(data));
  };

export const updateUser = 
  (user: IUser): AppThunk =>
  async (dispatch) => {
    await api.updateUser(user);
    const data = await api.getUsers();
    dispatch(getUsers(data));
  };

export const deleteUser = 
  (user: IUser): AppThunk =>
  async (dispatch) => {
    await api.deleteUser(user);
    const data = await api.getUsers();
    dispatch(getUsers(data));
  };

export default userSlice.reducer;
