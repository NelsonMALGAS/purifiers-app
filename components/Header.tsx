"use client"

import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle"
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
import Image from "next/image";
import { motion } from "framer-motion"
import { Separator } from "./ui/separator";
import { LoaderCircle, LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import showToastMessage from "./showToastMessage";
import { authSuccessMessages, authErrorMessages } from "@/constants/success";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {

    const { handleSignOut, loading, currentUser } = useAuth()

    const signOut = async () => {
        try {
            const result = await handleSignOut()
            if (result?.success) {
                showToastMessage({ type: "success", ...authSuccessMessages.signout })
            } else {
                showToastMessage({ type: "error", ...authErrorMessages.signout })
            }
        } catch (error) {
            console.error("Something went wrong while signing out", error)
        }
    }
    return (
        <motion.header
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="py-8 xl:py-12 text-foreground px-4"
        >

            <div className="container mx-auto flex justify-between items-center gap-12">
                <Link href="/" className="flex justify-center items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="AquaSync Logo"
                        width={40}
                        height={40}
                        className="rounded-md shadow-sm"
                    />
                    <span className="text-2xl font-semibold text-foreground">
                        <span className="text-primary"> Aqua</span>Sync
                    </span>
                </Link>
                {/* {desktop nav} */}
                <div className="hidden xl:flex items-center gap-8">
                    <Navbar />

                    {!loading && currentUser && (
                        <>
                            <Button
                                variant="destructive"
                                className="bg-red-500"
                                onClick={signOut}
                                disabled={loading}
                            >
                                {loading ? (
                                    <LoaderCircle className="w-4 h-4 animate-spin" />
                                ) : (
                                    <LogOut />
                                )}
                            </Button>
                            <ProfileDropdown />
                        </>
                    )}
                    <ModeToggle />
                </div>

                {/* mobile Nav */}

                <div className="xl:hidden">
                    <MobileNav />
                </div>
            </div>
            <Separator className="bg-primary/50 dark:bg-background mt-2" />
        </motion.header>
    );
};

export default Header;