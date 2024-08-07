import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loader() {
  return (
    <div className=' backdrop-blur-sm w-full h-screen absolute bg-[#00000052] flex justify-center items-center'>
        <div className='w-[150px] h-[150px] max-w-[400px] gap-3  flex-col border-solid border-gray-500 border-1 shadow-md rounded-3xl bg-[#ffffff56] lg:h-[200px] flex justify-center items-center'>
            <FontAwesomeIcon icon={faSpinner} color="purple" spin={true} className='text-[30px] lg:text-[50px]' />
            <span className='lg:text-2xl text-violet-800'>Loading.....</span>
        </div>
    </div>
  )
}
