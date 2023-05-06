'use client'

import { useState } from "react";
import EditBookModal from "./AddBookModal";

export default function EditButton({ book }) {

  const [modalActive, setModalActive] = useState();

  function clickHandler(e) {
    e.preventDefault();


  }

  return (
    <>
      <button onClick={clickHandler} className='absolute text-white hover:bg-sky-600 active:scale-95 bottom-3 left-[8.2rem] bg-sky-500 px-[.4rem] text-[.8rem] rounded-md'>
        Edit
      </button>
      <EditBookModal />
    </>
  )
}
