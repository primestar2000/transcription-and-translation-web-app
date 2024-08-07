import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loader() {
  return (
    <div className=' backdrop-blur-sm w-full h-screen fixed bg-[#00000048] flex justify-center items-center'>
        <div className='w-[150px] h-[100px] lg:w-[400px] gap-2  flex-col lg:border-none lg:bg-transparent border-solid border-gray-500 border-1 shadow-md rounded-2xl bg-[#05040456] lg:h-[200px] flex justify-center items-center'>
            <FontAwesomeIcon icon={faSpinner} color="white" spin={true} className='text-[30px] lg:text-[50px]' />
            <span className='lg:text-2xl text-white'>Loading.....</span>
        </div>
    </div>
  )
}
