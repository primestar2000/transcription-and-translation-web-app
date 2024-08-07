import React from 'react'

export default function Alert(errorMes) {
  return (
    <div className='absolute text-red-700 left-1/2 translate-x-[-50%] bg-red-300 p-2 lg:w-[450px] w-[300px] rounded top-5 transition-all  delay-100'>
        {"Alert: "+ errorMes}
    </div>
  )
}
