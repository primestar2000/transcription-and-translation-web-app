import React from 'react'
import ReactDOM from 'react-dom/client'
import image404 from "../assets/images/404.png"

export default function ErrorPage(){
    return(
        <>
        <div className='w-full p-10 flex justify-center items-center h-screen'>
            <div className='w-[400px] p-5'>
                <img src={image404} className='w-full' />
                <h1 className='text-violet-600 text-[40px] text-center font-extrabold'>404</h1>
                <p className='text-center'>Seems you lost your way, page not found.</p>
            </div>
        </div>
        </>
    )
}