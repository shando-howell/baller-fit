import { ShoppingCartIcon } from "lucide-react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel,
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import Link from "next/link";

const ShoppingCart = () => {
  return (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ShoppingCartIcon size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <div>My shopping cart is empty</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/account/my-cart">Go To Cart</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default ShoppingCart