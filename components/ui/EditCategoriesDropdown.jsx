import { useEffect, useState } from "react";
import DownArrowIcon from "./DownArrowIcon";
import UpArrowIcon from "./UpArrowIcon";
import ClickAwayListener from "react-click-away-listener";
import { useGetCategoriesMutation } from "@/services/api/handleReqApiSlice";



export default function EditCategoriesDropDown({ selectedCategory, setSelectedCategory, setCategoryError, book }) {

  const [categories, setCategories] = useState();
  const [getCategories, { isLoading }] = useGetCategoriesMutation()
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getCategories();
      setCategories(data);
    }

    fetchCategories();


  }, [])

  useEffect(() => {
    const matchingCategory = categories?.find((b) => b.categoryName === book?.categoryName);
    setSelectedCategory({ Id: matchingCategory?.categoryId, Name: matchingCategory?.categoryName });

  }, [categories]);

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
      <div className="relative flex flex-col w-full items-center">
        <button onClick={handleClick} type='button' className="w-[100%]   h-[2.2rem] rounded-md px-4 outline-none transition-all text-start bg-white flex justify-between items-center"><span> <span className="text-gray-500" >Category:</span> {selectedCategory?.Name} </span> {isOpened ? <UpArrowIcon /> : <DownArrowIcon />}</button>

        {isOpened ? (<div className=" z-[100] bg-slate-100 absolute h-[10rem] overflow-y-scroll w-[100%] top-[2rem] rounded-b-md ">
          <ul className="w-full">

            {

              categories.map((category) => {
                return (
                  <li key={category.categoryId} onClick={() => { setSelectedCategory({ Id: category.categoryId, Name: category.categoryName }); setIsOpened(false); setCategoryError(false); }} className="py-1 pl-[5.5rem] hover:bg-slate-200">{category.categoryName}</li>
                )

              })
            }
          </ul>
        </div>) : null}

      </div>
    </ClickAwayListener>
  )
}
