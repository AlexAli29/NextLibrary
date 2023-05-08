import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { actions as tokenActions } from "@/slices/tokenSlice";
import { actions as userActions } from "@/slices/userSlice";
import { bindActionCreators } from "@reduxjs/toolkit";

export const useActions = () => {

  const dispatch = useDispatch();
  const rootAction = {
    ...tokenActions,
    ...userActions
  };

  return useMemo(() => bindActionCreators(rootAction, dispatch)
    , [dispatch])
}