'use client'

export const ArchiveButton = ({ bookId }) => {
  function clickHandler(e) {
    e.preventDefault();
    console.log(bookId)

  }

  return (
    <button onClick={clickHandler} className='absolute text-white hover:bg-red-600 active:scale-95 bottom-3 left-[4.5rem] bg-red-500 px-[.4rem] text-[.8rem] rounded-md'>
      Archive
    </button>
  )
}
