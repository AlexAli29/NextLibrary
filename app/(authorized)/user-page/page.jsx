'use client'
import { useActions } from '@/hooks/useActions';
import { useUser } from '@/hooks/useUser'
import { useLogoutMutation } from '@/services/api/handleReqApiSlice';
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/navigation';




export default function UserProfile() {


  const { logOut, removeUserData } = useActions()
  const user = useUser();
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    await logout();
    logOut();
    removeUserData();
    router.push('/');
  }

  return (
    <>

      <section class="relative pt-[20rem] py-16 bg-blueGray-200">
        <div class="container mx-auto px-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div class="px-6">
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div class="relative">
                    <div className='bg-rose-400 w-[10rem] h-[10rem] flex items-center justify-center text-white rounded-full text-[7rem]'>
                      {user?.userName[0]?.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div class="py-6 px-3 mt-32 sm:mt-0">
                    <button onClick={handleLogout} class="bg-red-400 active:bg-red-500 active:scale-95 hover:scale-105 font-montserrat  text-white font-bold hover:shadow-md shadow text-xs px-3 py-2 rounded-3xl outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                      Log out
                    </button>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-1">
                  <div class="flex justify-center py-4 lg:pt-4 pt-8">
                    <div class="mr-4 p-3 text-center">
                      <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span class="text-sm text-blueGray-400">Orders</span>
                    </div>
                    <div class="mr-4 p-3 text-center">
                      <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span class="text-sm text-blueGray-400">Books</span>
                    </div>
                    <div class="lg:mr-4 p-3 text-center">
                      <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span class="text-sm text-blueGray-400">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center mt-4">
                <h3 class="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {user?.userName}
                </h3>
                <div class="text-xl leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                  <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {user?.userEmail}
                </div>
              </div>
              <div class="mt-2 py-2 border-t border-blueGray-200 text-center">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4 text-[1.4rem] flex flex-col items-center">
                    <Tab.Group>
                      <Tab.List className='bg-gray-200 w-fit px-1 py-1 rounded-lg  flex justify-center space-x-1'>
                        <Tab className=' px-3 rounded-lg  focus:outline-none  ui-selected:bg-red-400 ui-selected:text-white '>Books</Tab>
                        <Tab className='px-3 rounded-lg ui-selected:bg-red-400 ui-selected:text-white focus:outline-none'>Orders</Tab>
                      </Tab.List>
                      <Tab.Panels>
                        <Tab.Panel>Book list</Tab.Panel>
                        <Tab.Panel>Orders list</Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
