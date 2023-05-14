import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { actions as tokenActions } from "@/slices/tokenSlice";
import { actions as userActions } from "@/slices/userSlice";
import { actions as archiveActions } from "@/slices/archiveSlice";
import { actions as orderActions } from "@/slices/orderSlice";
import { actions as booksActions } from "@/slices/bookSlice";
import { bindActionCreators } from "@reduxjs/toolkit";

export const useActions = () => {

  const dispatch = useDispatch();
  const rootAction = {
    ...tokenActions,
    ...userActions,
    ...archiveActions,
    ...orderActions,
    ...booksActions,
  };

  return useMemo(() => bindActionCreators(rootAction, dispatch)
    , [dispatch])
}