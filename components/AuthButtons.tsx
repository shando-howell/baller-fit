"use client";

import { useAuth } from "@/context/auth";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
    const router = useRouter();
    const auth = useAuth();

    return (
        <div>
            {!!auth?.currentUser && (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            {!!auth.currentUser.photoURL && (
                                <Image 
                                    src={auth.currentUser.photoURL} 
                                    alt={`${auth.currentUser.displayName}`}
                                    width={70}
                                    height={70}
                                />
                            )}
                            <AvatarFallback>
                                {(auth.currentUser.displayName || auth.currentUser.email)?.[0]}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            <div>{auth.currentUser.displayName}</div>
                            <div className="font-normal text-xs">{auth.currentUser.email}</div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/account">My Account</Link>
                        </DropdownMenuItem>

                        {!!auth.customClaims?.admin && (
                            <DropdownMenuItem asChild>
                                <Link href="/admin-dashboard">Admin Dashboard</Link>
                            </DropdownMenuItem>
                        )}

                        {!auth.customClaims?.admin && (
                            <DropdownMenuItem asChild>
                                <Link href="/account/my-cart">My Cart</Link>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={async () => {
                            await auth.logout();
                            router.refresh();
                        }}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            {!auth?.currentUser && (
                <div className="flex gap-2 items-center">
                    <Link href="/login" className="hover:underline">Login</Link>
                    <Link href="/register" className="hover:underline">Register</Link>
                </div>
            )}
        </div>
    )
}