'use client'

import { useActions } from "@/hooks/useActions";
import { useUser } from "@/hooks/useUser";
import { useToggleArchiveMutation } from "@/services/api/handleReqApiSlice";
import { usePathname, useRouter } from "next/navigation"


export const ArchiveButton = ({ bookId }) => {

  const { deleteFromArchive } = useActions();
  const pathName = usePathname();
  const router = useRouter();
  const [toggleArchive] = useToggleArchiveMutation();
  const user = useUser();
  async function clickHandler(e) {
    e.preventDefault();
    await toggleArchive({ bookId });
    router.refresh();
    deleteFromArchive(bookId);

  }

  return (
    <>
      {user.roleName === 'Admin' ? (
        <>
          {pathName === '/' ? <button onClick={clickHandler} className='absolute text-white hover:bg-red-600 active:scale-95 bottom-3 left-[.75rem] bg-red-500 px-[.4rem] text-[.9rem] rounded-md'>
            Archive
          </button> : <button onClick={clickHandler} className='absolute text-white hover:bg-lime-700 active:scale-95 bottom-3 left-[.75rem] bg-lime-600 px-[.4rem] text-[.9rem] rounded-md'>
            Publish
          </button>}</>

      ) : null}
    </>
  )
}
