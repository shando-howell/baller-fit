import Link from "next/link"
import AuthButtons from "./AuthButtons"

const NavBar = () => {
  return (
    <>
        <nav 
            className="bg-sky-700 text-yellow-400 p-5 h-18 flex items-center justify-between z-10 relative"
        >
            <Link 
              href="/"
              className="text-2xl tracking-widest flex gap-2 items-center"
            >
              BallerFit
            </Link>
            <ul className="flex gap-6 items-center">
              <li>
                <Link 
                  href="/shop"
                  className="hover:underline"
                >Shop</Link>
              </li>
              <li>
                <AuthButtons />
              </li>
            </ul>
        </nav>
    </>
  )
}

export default NavBar