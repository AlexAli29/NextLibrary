import { selectAccessToken } from "@/slices/tokenSlice"
import { useSelector } from "react-redux"

export const useToken = () => {
  const token = useSelector(selectAccessToken);
  return token;
}