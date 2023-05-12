'use client'
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import EditBookModal from "./EditBookModal";

export default function EditButton({ book }) {
  const user = useUser();
  const [modalActive, setModalActive] = useState();

  function clickHandler(e) {
    e.preventDefault()
    setModalActive(true);


  }

  return (
    <>
      {user.roleName === 'Admin' ?
        (<>
          <button onClick={clickHandler} className='absolute text-white hover:bg-sky-600 active:scale-95 bottom-3 left-[5rem] bg-sky-500 px-[.4rem] text-[.9rem] rounded-md'>
            Edit
          </button>

          <EditBookModal modalActive={modalActive} setModalActive={setModalActive} book={book} />
        </>)
        : null}
    </>
  )
}
