import { GithubIcon, HomeIcon, LinkedinIcon } from 'lucide-react'
import Link from "next/link"

export default function NavBar() {
  return (
    <header className="border-2 sticky top-0 w-full backdrop-blur-md bg-white/0 dark:bg-gray-950/40 z-50  h-16 flex items-center ">
      <Link className="flex items-center" href="/">
        <p className="h-6 w-6" />
        <span className="text-lg font-extrabold bg-gradient-to-t from-blue-300  via-blue-400 to-blue-600 text-transparent bg-clip-text">CRYPTOTOS</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 md:gap-6">
      <Link href="/" prefetch={false}>
              <HomeIcon className="w-6 h-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
            </Link>
            <Link href={'https://github.com/e17gomes'} target='_blank' prefetch={false}>
              <GithubIcon className="w-6 h-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
            </Link>
            <Link href="https://www.linkedin.com/in/eduardo-gomes-098735260/" target='_blank' prefetch={false}>
              <LinkedinIcon className="w-6 h-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
            </Link>
      </nav>
    </header>
  )
}

