'use client'
import { useRouter } from 'next/navigation';
import ClickAwayListener from 'react-click-away-listener';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, setUserData } from '@/slices/userSlice';
import { useRefreshMutation, useGetUserMutation } from '@/services/api/handleReqApiSlice';
import { setToken } from '@/slices/tokenSlice';
import UserDropDown from './ui/UserDropDown';
import { usePathname } from 'next/navigation';
import SearchInput from './ui/SearchInput';
import Loader from './ui/Loader';


export const Header = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();
  const [navActive, setNavActive] = useState(false);
  const dispatch = useDispatch();
  const userDataFromSlice = useSelector(selectUserData)
  const [user, setUser] = useState(userDataFromSlice);
  const [refresh] = useRefreshMutation();
  const pathname = usePathname();
  const [getUser] = useGetUserMutation();

  useEffect(() => { setUser(userDataFromSlice) }, [userDataFromSlice]);

  useEffect(() => {

    const handleRefresh = async () => {
      const { data, error } = await refresh();

      if (error) {
        setLoadingUser(false);
      }

      if (!error) {

        const { accessToken } = data;

        dispatch(setToken(accessToken));

        const { data: userDataRes } = await getUser();


        const { userData: User } = userDataRes;

        setUser(User)
        dispatch(setUserData(User));
        setLoadingUser(false);

      } else {
        if (pathname != '/') {
          router.push("/login");
        }

      }
    };

    handleRefresh();

  }, []);


  const handleClickAway = () => {
    setNavActive(false)

  };

  useEffect(() => {

    function handleScroll() {
      setNavActive(false);

    }

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [setNavActive]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <header onScroll={handleClickAway} className={`sticky top-0 z-[1000] flex  ${navActive ? 'h-[9rem]' : 'h-[4.5rem]'} justify-center   bg-gradient-to-r bg-red-100 shadow-sm  from-orange-100 
    font-montserrat items-center`}>

        <Link className='absolute left-[-16px] md:left-10' href='/'>
          <p className='  break-words  text-red-400 rounded-lg text-[1rem] md:text-[1.6rem] tracking-[.4rem] font-medium p-1 w-32 text-center leading-6'>
            <span className='tracking-[.2rem]'>Mort</span> BOOK
          </p>
        </Link>

        <div className='flex flex-grow justify-center '>
          <SearchInput navActive={navActive} setNavActive={setNavActive} />
        </div>

        <div className='absolute right-2 md:right-11'>
          {loadingUser ? (
            <Loader style='w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-orange-200 fill-red-300' />
          ) : ((user.userName ? <UserDropDown user={user} /> : <Link href='/login'><button className=' bg-red-300 drop-shadow-md text-[12px] md:text-[16px]  text-slate-100 p-1 px-2  md:p-1 md:px-3 shadow-2xl rounded-lg hover:scale-[104%] ease-in-out transition-all  '>
            Login
          </button>
          </Link>))}
        </div>

      </header >
    </ClickAwayListener >
  )
}
