'use client'
import { useState } from "react"
import ClickAwayListener from "react-click-away-listener"
import { useForm } from "react-hook-form";
import CloseModalIcon from "./CloseModalIcon";
import CategoriesDropDown from "./CategoriesDropDown";

export default function AddBookModal({ modalActive, setModalActive }) {

  const [selectedCategory, setSelectedCategory] = useState();
  const [fileName, setFileName] = useState();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {

  }

  return (

    <ClickAwayListener onClickAway={() => { setModalActive(false); console.log('away') }}>
      <div className={` ${modalActive ? 'flex' : 'hidden'} p-2 items-center py-3  rounded-3xl z-[150] bg-[rgba(254,136,109,0.3)]  absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex-col pb-5 w-[50rem] backdrop-blur-[10px] shadow-lg  add_book_modal
`}>

        <CloseModalIcon classes='w-5 h-5 absolute right-[1rem]' setModalActive={setModalActive} />

        <div className="mb-6">
          <span className="  text-red-700 font-medium text-2xl tracking-widest ">Add Book</span>
        </div>
        <form className="flex flex-col space-y-6 w-[100%] items-center " onSubmit={handleSubmit(onSubmit)}>

          <div className="  flex w-[100%] space-x-6 px-8  ">
            <div className=" flex flex-col space-y-7 w-[55%]">
              <div className=" relative flex flex-col w-[100%] items-center">
                <input className="addbookinput" type="text" placeholder="Name " />
              </div>

              <div className="relative flex flex-col w-[100%] items-center">
                <input className="addbookinput" type="text" placeholder="Price " />
              </div>

              <div className=" relative flex flex-col w-[100%] items-center">
                <input className="addbookinput" type="text" placeholder="Author " />
              </div>

              <div className="relative flex flex-col w-[100%] items-center">
                <input className="addbookinput" type="text" placeholder="Year " />
              </div>
            </div>

            <div className=" relative flex flex-col w-[70%] items-center">
              <textarea className="resize-none  w-[100%] hover:scale-[102%] hover:shadow focus:scale-[104%] focus:shadow-md h-[14rem] rounded-md pl-2 outline-none transition-all" type="text" placeholder="Description..." />
            </div>
          </div>



          <CategoriesDropDown selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

          <div className="flex items-center justify-center w-[45%]">
            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border  border-none
            rounded-lg cursor-pointer bg-gray-50 hover:bg-bray-800 hover:scale-[102%]  hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:shadow transition-all" >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">

                {fileName ? <p className="mb-1 text-sm text-gray-500">{fileName}</p> : (<p className="mb-1 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> Book Image</p>)}

              </div>
              <input onChange={(e) => {
                setFileName(e.target.files[0]?.name);
              }} id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <button className="bg-[#F7A996] text-gray-50 font-normal hover:scale-[103%] hover:shadow-md active:scale-[98%]  py-[.2rem] px-10 rounded-2xl ease-in duration-75" type="submit">Add</button>

        </form>

      </div>
    </ClickAwayListener>


  )
}
