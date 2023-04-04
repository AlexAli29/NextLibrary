'use client'
import RangeSlider from './RangeSlider';
import PriceRangeSlider from './PriceRangeSlider';
import ClickAwayListener from 'react-click-away-listener';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchInput({ navActive, setNavActive }) {

  const router = useRouter();
  let currentTime = new Date();
  const [searchParams, setSearchParams] = useState('');
  const [yearSliderActive, setYearSliderActive] = useState(false);
  const [yearRange, setYearRange] = useState([0, currentTime.getFullYear()]);
  const [priceSliderActive, setPriceSliderActive] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/?searchString=${searchParams}&year=${yearRange}&price=${priceRange}`)

  };

  return (
    <div className='relative flex'>
      <input onChange={(e) => { setSearchParams(e.target.value) }} onClick={() => { setNavActive(true) }} type="text" placeholder='title or author' className={` bg-slate-100 pl-5 shadow    ease-in-out transition-all ${navActive ? 'shadow-md rounded-l-full w-[20rem] h-16' : ' hover:scale-105 hover:shadow-md rounded-full sm:w-[18rem] md:w-[20rem] lg:w-[22rem] h-10'}  outline-none`} />
      <ClickAwayListener onClickAway={() => setYearSliderActive(false)}>
        <div onClick={() => { setYearSliderActive(true); setPriceSliderActive(false) }} className={` relative text-sm text-slate-800 ${navActive ? ' w-20 h-16 bg-slate-100 shadow-md  flex items-end pb-3 justify-center' : ' hidden'} `}>
          <span className='absolute top-2 font-bold'>Year</span>
          <span>{yearRange[0]}</span>
          -
          <span>{yearRange[1]}</span>
          <RangeSlider initialMin={0}
            initialMax={2023}
            min={0}
            max={2023}
            step={1}
            priceCap={1}
            yearSliderActive={yearSliderActive}
            setYearRange={setYearRange} />
        </div>
      </ClickAwayListener >

      <ClickAwayListener onClickAway={() => { setPriceSliderActive(false) }}>
        <div onClick={() => { setPriceSliderActive(true); setYearSliderActive(false) }} className={` relative text-sm text-slate-800 ${navActive ? ' w-32 h-16 bg-slate-100 shadow-md  flex items-end pb-3 justify-center' : ' hidden'} `}>
          <span className='absolute top-2 font-bold'>Price</span>
          <span>{priceRange[0]}</span>
          -
          <span>{priceRange[1]} <span>USD</span></span>
          <PriceRangeSlider
            initialMin={0}
            initialMax={10000}
            min={0}
            max={10000}
            step={1}
            priceCap={1}
            priceSliderActive={priceSliderActive}
            setPriceRange={setPriceRange}
          />
        </div>
      </ClickAwayListener>
      <div className={`relative ${navActive ? 'flex' : ' hidden'} w-12 rounded-r-full pr-2  h-16 bg-slate-100  items-center justify-center`}>
        <button onClick={handleSearch} className={`flex ${navActive ? '' : ' right-1'} justify-center items-center  bg-red-300 rounded-full w-10 h-10`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
      <button onClick={handleSearch} className={`flex absolute ${navActive ? 'hidden' : ' right-1 top-1'} justify-center items-center  bg-red-300 rounded-full w-8 h-8`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </button>

    </div>
  )
}
