import Loader from "@/components/ui/Loader";

export default function loading() {
  return (
    <div className='w-[80vw] h-[40rem] flex justify-center items-center space-x-16  top-4 left-[50%] translate-x-[-50%] relative  rounded-2xl'>
      <Loader style='w-[9rem] h-[9rem]  mr-2 text-gray-200 animate-spin dark:text-orange-200 fill-red-300 z-[1000]' />

    </div>)
}
