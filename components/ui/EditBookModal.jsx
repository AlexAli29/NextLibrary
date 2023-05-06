'use client'
import { useState } from "react"
import ClickAwayListener from "react-click-away-listener"
import { useForm } from "react-hook-form";
import CloseModalIcon from "./CloseModalIcon";
import CategoriesDropDown from "./CategoriesDropDown";
import { useAddBookImageMutation, useEditBookMutation } from "@/services/api/handleReqApiSlice";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import { Dialog } from "@headlessui/react";

export default function EditBookModal({ modalActive = false, setModalActive, book }) {

  const router = useRouter();
  const [categoryError, setCategoryError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [fileName, setFileName] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [fileError, setFileError] = useState(false);
  const [editBook, { isLoading }] = useEditBookMutation();
  const [addBookImage, { isLoading: isImageLoading }] = useAddBookImageMutation();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(e.target.files[0]?.name)
    setFileError(false)
  }

  const onSubmit = async (data) => {
    debugger
    if (!selectedCategory) {

      setCategoryError(true);
    }
    if (!selectedFile) {

      setFileError(true);
    }
    if (selectedCategory && selectedFile) {
      setCategoryError(false);
      setFileError(false);
      const { bookName, bookPrice, bookAuthor, bookYear, bookDescription } = data;
      const formData = new FormData();
      formData.append("Image", selectedFile);


      try {
        const categoryId = selectedCategory.Id;


        const { data: BookId } = await editBook({ bookId: book.bookId, bookName, bookPrice, bookAuthor, bookYear, bookDescription, categoryId });
        debugger
        console.log(BookId)
        formData.append("BookId", BookId)

        const data = await addBookImage(formData);
        router.refresh();
        setModalActive(false);

      }
      catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Dialog as='div' open={modalActive} onClose={() => setModalActive(false)} className={`flex p-2 items-center py-3  rounded-3xl z-[150] bg-[rgba(254,136,109,0.3)]  absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex-col pb-5 w-[50rem] backdrop-blur-[50px] shadow-lg  add_book_modal ${(isImageLoading || isLoading) ? 'pointer-events-none' : ''}`}>

      <CloseModalIcon classes='w-5 h-5 absolute right-[1rem]' setModalActive={setModalActive} />

      <Dialog.Title className="mb-6">
        <span className="  text-red-700 font-medium text-2xl tracking-widest ">Edit Book</span>
      </Dialog.Title>

      <Dialog.Panel>
        <form className="flex flex-col space-y-6 w-[100%] items-center " onSubmit={handleSubmit(onSubmit)}>

          <div className="  flex w-[100%] space-x-6 px-8  ">
            <div className=" flex flex-col space-y-7 w-[55%]">
              <div className=" relative flex flex-col w-[100%] items-center">
                <input  {...register('bookName', {
                  required: "Book Name is required field"
                })} className="addbookinput" type="text" placeholder="Name " />
                {errors?.bookName && (
                  <div className=" absolute left-0 bottom-[-1.3rem] text-xs text-red-600 pl-6 pt-1 ">{errors.bookName.message}</div>
                )}
              </div>

              <div className="relative flex flex-col w-[100%] items-center">
                <input {...register('bookPrice', {
                  required: "Price is required field"
                })} className="addbookinput" type="text" placeholder="Price " />
                {errors?.bookPrice && (
                  <div className="text-xs absolute left-0 bottom-[-1.2rem] text-red-600 pl-6 pt-1 ">{errors?.bookPrice?.message}</div>
                )}
              </div>

              <div className=" relative flex flex-col w-[100%] items-center">
                <input {...register('bookAuthor', {
                  required: "Author is required field"
                })} className="addbookinput" type="text" placeholder="Author " />
                {errors?.bookAuthor && (
                  <div className="text-xs absolute left-0 bottom-[-1.3rem] text-red-600 pl-6 pt-1 ">{errors.bookAuthor.message}</div>
                )}
              </div>

              <div className="relative flex flex-col w-[100%] items-center">
                <input {...register('bookYear', {
                  required: "Year is required field"
                })} className="addbookinput" type="text" placeholder="Year " />
                {errors?.bookYear && (
                  <div className="text-xs absolute left-0 bottom-[-1.3rem] text-red-600 pl-6 pt-1 ">{errors.bookYear.message}</div>
                )}
              </div>
            </div>

            <div className=" relative flex flex-col w-[70%] items-center">
              <textarea {...register('bookDescription', {
                required: "Description Name is required field"
              })} className="resize-none  w-[100%] hover:scale-[102%] hover:shadow focus:scale-[104%] focus:shadow-md h-[14rem] rounded-md pl-2 outline-none transition-all" type="text" placeholder="Description..." />
              {errors?.bookDescription && (
                <div className="text-xs absolute right-0 bottom-[-1.3rem] text-red-600 pl-6 pt-1 ">{errors.bookDescription.message}</div>
              )}
            </div>
          </div>


          <div className="relative flex flex-col w-[45%] items-center">
            <CategoriesDropDown selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setCategoryError={setCategoryError} />
            {categoryError ? (<div className="text-xs absolute left-0 bottom-[-1.3rem] text-red-600 pl-6 pt-1 ">Select book category</div>) : null}
          </div>


          <div className="relative flex items-center justify-center w-[45%]">
            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border  border-none
            rounded-lg cursor-pointer bg-gray-50 hover:bg-bray-800 hover:scale-[102%]  hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:shadow transition-all" >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">

                {fileName ? <p className="mb-1 text-sm text-gray-500">{fileName}</p> : (<p className="mb-1 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> Book Image</p>)}

              </div>
              <input onChange={handleFileInput} id="dropzone-file" type="file" className="hidden" />
            </label>
            {fileError ? (<div className="text-xs absolute left-0 bottom-[-1.3rem] text-red-600 pl-6 pt-1 ">Choose image</div>) : null}
          </div>

          {(isLoading || isImageLoading) ? <Loader style='w-9 h-9  mr-2 text-gray-200 animate-spin dark:text-orange-200 fill-red-300 z-[1000]' /> : <button className="bg-[#F7A996] text-gray-50 font-normal hover:scale-[103%] hover:shadow-md active:scale-[98%]  py-[.2rem] px-10 rounded-2xl ease-in duration-75" type="submit">Add</button>}



        </form>
      </Dialog.Panel>

    </Dialog>



  )
}
