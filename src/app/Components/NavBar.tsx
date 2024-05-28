
import Link from "next/link"

export default function NavBar() {
  return (
    <header className="sticky top-0 left-0 w-full backdrop-blur-md bg-white/0 dark:bg-gray-950/80 z-50 px-4 md:px-6 h-16 flex items-center">
      <Link className="flex items-center gap-2" href="#">
        <p className="h-6 w-6" />
        <span className="text-lg font-extrabold bg-gradient-to-t from-yellow-300  via-orange-400 to-red-600 text-transparent bg-clip-text">Cryptotos</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 md:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
          Home
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Search
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          LinkedIn
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          GitHub
        </Link>
      </nav>
    </header>
  )
}

