"use server"

import { auth, firestore } from "@/firebase/server"
import { FieldValue } from "firebase-admin/firestore";

export const addToCart = async (productId: string, authToken: string) => {
    const verifiedToken = await auth.verifyIdToken(authToken);

    if (!verifiedToken) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    await firestore.collection("cart").doc(verifiedToken.uid).set({
        [productId]: true
    }, {
        merge: true
    })
}

export const removeFromCart = async (productId: string, authToken: string) => {
    const verifiedToken = await auth.verifyIdToken(authToken);

    if (!verifiedToken) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    await firestore.collection("cart").doc(verifiedToken.uid).update({
        [productId]: FieldValue.delete()
    })
}