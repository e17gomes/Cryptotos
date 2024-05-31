import Link from 'next/link'
import React from 'react'


const Footer = () => {
    return (
        <footer className="mx-auto backdrop-blur-md border-2 bottom-0 bg-white/0 dark:bg-gray-900/70 p-6 rounded-t-xl">
          <div className="flex items-center justify-center select-none">
            Developed with 💙 by <span className='mx-1 font-bold bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 via-blue-400 to-blue-700'> Eduardo Gomes </span> 👨🏻‍💻
          </div>
        </footer>
      )
}

export default Footer
