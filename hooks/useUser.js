import { selectUserData } from "@/slices/userSlice";
import { useSelector } from "react-redux";

export const useUser = () => {
  const user = useSelector(selectUserData);

  return user
}