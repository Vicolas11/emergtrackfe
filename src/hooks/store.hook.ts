import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../interfaces";

// use these custom hooks instead of the default ones cus they are tied to the state of this app's store
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
