import { selectBooks } from "@/slices/bookSlice";
import { useSelector } from "react-redux"

export const useBooks = () => {
  const books = useSelector(selectBooks);
  return books;
}