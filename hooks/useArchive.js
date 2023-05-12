import { selectArchive } from "@/slices/archiveSlice";
import { useSelector } from "react-redux"

export const useArchive = () => {
  const archive = useSelector(selectArchive);
  return archive;
}