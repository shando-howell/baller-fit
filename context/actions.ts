"use server"

import { auth } from "@/firebase/server";
import { cookies } from "next/headers";

export const removeToken = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("firebaseAuthToken");
    cookieStore.delete("firebaseAuthRefreshToken");
};

export const setToken = async ({
    token,
    refreshToken
}: {
    token: string;
    refreshToken: string;
}) => {
    try {
        const verifiedToken = await auth.verifyIdToken(token);
        if (!verifiedToken) {
            console.log('No verified token found.')
            return;
        }
        console.log(`Verified token uid ==> ${verifiedToken.uid}`)

        // Auth bug starts here...
        // const userRecord = await auth.getUser(verifiedToken.uid);

        // This appears to work...
        const userRecord = verifiedToken;
        if (process.env.ADMIN_EMAIL === userRecord.email && !userRecord.customClaims?.admin) {
            auth.setCustomUserClaims(userRecord.uid, {
                admin: true
            });
        }

        const cookieStore = await cookies();
        cookieStore.set("firebaseAuthToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        cookieStore.set("firebaseAuthRefreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
    } catch (e) {
        console.log("Could not set admin privilege to verified token.")
    }
}