import "server-only";
import { cookies } from "next/headers";
import { auth, firestore } from "@/firebase/server";


export const getUserCart = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("firebaseAuthToken")?.value;

    if (!token) {
        return {}
    }

    const verifiedToken = await auth.verifyIdToken(token);

    if (!verifiedToken) {
        return {}
    }

    const cartSnapshot = await firestore
        .collection("cart")
        .doc(verifiedToken.uid)
        .get();

    const cartData = cartSnapshot.data();
    return cartData || {};
};