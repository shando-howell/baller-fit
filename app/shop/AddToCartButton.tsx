'use client'

import { Button } from "@/components/ui/button"
import { addToCart } from "./actions"
import { useAuth } from "@/context/auth"

const AddToCartButton = ({productId}: {
    productId: string
}) => {
    const auth = useAuth()

    return (
        <>
            <Button onClick={async () => {
                const tokenResult = await auth?.currentUser?.getIdTokenResult();
                if (!tokenResult) {
                    return;
                }
                await addToCart(productId, tokenResult.token)
            }}>Add To Cart</Button>
        </>
    )
}

export default AddToCartButton