'use client'

import { Button } from "@/components/ui/button"
import { addToCart } from "./actions"
import { useAuth } from "@/context/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const AddToCartButton = ({productId}: {
    productId: string
}) => {
    const auth = useAuth();
    const router = useRouter();

    return (
        <>
            <Button onClick={async () => {
                const tokenResult = await auth?.currentUser?.getIdTokenResult();
                if (!tokenResult) {
                    router.push("/login");
                    return;
                }

                // if (isAddedToCart) {
                //     // Increment count
                // }

                await addToCart(productId, tokenResult.token);

                toast("Item added to cart");

                router.refresh();
            }}>Add To Cart</Button>
        </>
    )
}

export default AddToCartButton