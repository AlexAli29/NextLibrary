import { useEffect, useState } from "react";
import DownArrowIcon from "./DownArrowIcon";
import UpArrowIcon from "./UpArrowIcon";
import ClickAwayListener from "react-click-away-listener";
import { useGetCategoriesMutation } from "@/services/api/handleReqApiSlice";
import { copyWithStructuralSharing } from "@reduxjs/toolkit/dist/query";


export default function CategoriesDropDown({ selectedCategory, setSelectedCategory }) {

  const [categories, setCategories] = useState();
  const [getCategories, { isLoading }] = useGetCategoriesMutation()
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getCategories();

      setCategories(data)



    }

    fetchCategories();


  }, [])



  function handleClick() {
    if (isOpened == true) {
      setIsOpened(false);
    }
    else {
      setIsOpened(true);
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setIsOpened(false)}>
      <div className="relative flex flex-col w-[45%] items-center">
        <button onClick={handleClick} className="w-[100%]   h-[2.2rem] rounded-md px-4 outline-none transition-all text-start bg-white flex justify-between items-center"><span> <span className="text-gray-500" >Category:</span> {selectedCategory?.Name} </span> {isOpened ? <UpArrowIcon /> : <DownArrowIcon />}</button>

        {isOpened ? (<div className="bg-slate-100 absolute h-[10rem] overflow-y-scroll w-[100%] top-[2rem] rounded-b-md ">
          <ul className="w-full">

            {

              categories.map((category) => {
                return (
                  <li onClick={() => { setSelectedCategory({ Id: category.categoryId, Name: category.categoryName }); setIsOpened(false) }} className="py-1 pl-[5.5rem] hover:bg-slate-200">{category.categoryName}</li>
                )

              })
            }
          </ul>
        </div>) : null}

      </div>
    </ClickAwayListener>
  )
}
