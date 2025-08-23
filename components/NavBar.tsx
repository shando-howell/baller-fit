import Link from "next/link"
import AuthButtons from "./AuthButtons"
import { ShoppingCart } from "lucide-react"

const NavBar = () => {
  return (
    <>
        <nav 
            className="bg-sky-700 text-white p-5 h-18 flex items-center justify-between z-10 relative"
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
                  href="/"
                >
                  <ShoppingCart size={18}/>
                </Link>
              </li>
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