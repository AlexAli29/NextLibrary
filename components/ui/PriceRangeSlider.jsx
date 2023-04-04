
import { useState, useEffect, useRef } from "react";

const PriceRangeSlider = ({ initialMin, initialMax, min, max, step, priceCap, priceSliderActive, setPriceRange }) => {
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMin = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    progressRef.current.style.left = (minValue / max) * step + "%";
    progressRef.current.style.right = step - (maxValue / max) * step + "%";
    setPriceRange([minValue, maxValue])
  }, [minValue, maxValue, max, step]);

  return (
    <div className={`${priceSliderActive ? 'absolute top-[4.2rem] grid place-items-center ' : 'hidden'}`}>
      <div className="flex flex-col w-56 bg-white shadow-xl rounded-lg px-6 py-1">
        <h1 className="text-[1.24rem] font-medium text-rose-500 mb-1 text-center"> Enter Price range</h1>


        <div className="flex justify-around  items-center my-6 mt-1 ">
          <div className="flex flex-col items-center  ">
            <span className="p-2 font-normal"> From</span>
            <input
              onChange={(e) => setMinValue(e.target.value)}
              type="number"
              value={minValue}
              className="w-16 rounded-md border border-gray-400"
            />
          </div>

          <div className="flex flex-col items-center ">
            <span className="p-2 font-normal"> To</span>
            <input
              onChange={(e) => setMaxValue(e.target.value)}
              type="number"
              value={maxValue}
              className="w-16 rounded-md border border-gray-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="slider relative h-1 rounded-md bg-gray-300">
            <div
              className="progress absolute h-1 bg-red-200 rounded "
              ref={progressRef}
            ></div>
          </div>

          <div className="range-input relative  ">
            <input
              onChange={handleMin}
              type="range"
              min={min}
              step={step}
              max={max}
              value={minValue}
              className="range-min absolute w-full  -top-1  h-1   bg-transparent  appearance-none pointer-events-none"
            />

            <input
              onChange={handleMax}
              type="range"
              min={min}
              step={step}
              max={max}
              value={maxValue}
              className="range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;