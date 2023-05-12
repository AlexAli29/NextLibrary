'use client'

import { useState } from "react"
import AddBookIcon from "./ui/AddBookIcon"
import AddBookModal from "./ui/AddBookModal"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import { useArchive } from "@/hooks/useArchive"
import { useEffect } from "react"

export default function AdminBar() {
  const archive = useArchive();
  const user = useUser();
  const [modalActive, setModalActive] = useState(false)
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [archive])

  return (
    <>
      {user.roleName === 'Admin' ?
        (<>
          <div className="sticky top-0 z-40  p-3 flex items-center justify-end pr-5">
            <button onClick={() => router.push('/archive')} className="bg-red-300 rounded-md drop-shadow-xl mr-2 flex items-center font-montserrat
    text-[1rem] p-1 px-2 text-white font-normal hover:scale-110 hover:shadow-xl active:scale-95 ease-in-out transition-[1s]" >Archive
            </button>

            <button onClick={() => { setModalActive(true); console.log('click') }} className="bg-[#344966] rounded-md drop-shadow-xl   flex items-center font-montserrat
    text-[1rem] p-1 px-2 text-white font-normal hover:scale-110 hover:shadow-xl active:scale-95 ease-in-out transition-[1s]" >Add <AddBookIcon />
            </button>

          </div>

          <AddBookModal modalActive={modalActive} setModalActive={setModalActive} /></>) : null}

    </>

  )
}
