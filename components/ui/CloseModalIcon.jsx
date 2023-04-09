
export default function CloseModalIcon({ classes, setModalActive }) {
  return (
    <svg onClick={() => setModalActive(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(185 28 28)" className={`${classes} hover:scale-[106%]`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>

  )
}
