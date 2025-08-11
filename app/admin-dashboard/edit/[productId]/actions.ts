"use server"

import { auth, firestore } from "@/firebase/server";
import { Product } from "@/types/product"
import { productDataSchema } from "@/validation/productSchema";

export const updateProduct = async (data: Product, authToken: string) => {
    const { id, ...productData } = data;
    const verifiedToken = await auth.verifyIdToken(authToken);

    if (!verifiedToken.admin) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    const validation = productDataSchema.safeParse(productData);
    if (!validation.success) {
        return {
            error: true,
            message: validation.error.issues[0]?.message ?? "An error occurred",
        };
    }

    await firestore.collection("products").doc(id).update({
        ...productData,
        updated: new Date(),
    })
}