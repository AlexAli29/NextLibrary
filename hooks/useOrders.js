import { selectOrders } from "@/slices/orderSlice";
import { useSelector } from "react-redux"

export const useOrders = () => {
  const orders = useSelector(selectOrders);
  return orders;
}