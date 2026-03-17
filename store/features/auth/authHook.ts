import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/store/features/auth/authThunk";
import {
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from "@/store/features/auth/authSelectors";
import { logoutUser } from "./authSlice";
//import { logoutUser } from "./authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const login = async (email: string, password: string) => {
    return dispatch(loginUser({ email, password })).unwrap();
  };

  const signOut = () => {
    dispatch(logoutUser());
  };
  console.log("isAuthenticated", isAuthenticated);
  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    //signOut,
  };
};
