"use server"

import { auth, firestore } from "@/firebase/server";
import { productDataSchema } from "@/validation/productSchema";

export const saveNewProduct = async (data: {
    name: string;
    price: number;
    stock: number;
    brand: string;
    color: string;
    description: string;
    status: "hot" | "sale" | "new-arrival";
    category: "outwears" | "jerseys" | "hats" | "accessories" | "sneakers",
    token: string;
}) => {
    const {token, ...productData} = data;
    const verifiedToken = await auth.verifyIdToken(token);

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

    const product = await firestore.collection("products").add({
        ...productData,
        created: new Date(),
        updated: new Date()
    })

    return {
        productId: product.id,
    };
};