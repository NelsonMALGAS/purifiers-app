"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "../components/ui/sheet";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { links } from "@/constants/success";
import Image from "next/image";
import { ModeToggle } from "./ui/mode-toggle";
import useAuth from "@/hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const MobileNav = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { currentUser, loading } = useAuth();

    const handleClose = () => setOpen(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="flex justify-center items-center">
                <CiMenuFries className="text-[32px] text-primary cursor-pointer" />
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                </SheetHeader>

                <div className="mt-16 mb-8">
                    <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
                        <Link href="/" onClick={handleClose} className="flex items-center gap-3">
                            <Image
                                src="/logo.png"
                                alt="AquaSync Logo"
                                width={40}
                                height={40}
                                className="rounded-md shadow-sm"
                            />
                            <span className="text-3xl font-bold text-foreground">
                                <span className="text-primary">Aqua</span>Sync
                            </span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <ModeToggle />
                            {!loading && currentUser && <ProfileDropdown />}
                        </div>
                    </div>
                </div>

                <nav className="flex flex-col justify-center items-center gap-4">
                    {links.map((link, index) => (
                        <Link
                            href={link.path}
                            key={index}
                            onClick={handleClose}
                            className={`${link.path === pathname && "text-primary border-b-2 border-primary"
                                } capitalize font-medium hover:text-primary transition-all`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {!loading && !currentUser && (
                        <>
                            <Link
                                href="/login"
                                onClick={handleClose}
                                className={`${"/login" === pathname && "text-primary border-b-2 border-primary"
                                    } capitalize font-medium hover:text-primary transition-all`}
                            >
                                Login
                            </Link>
                            <Link
                                href="/sign-up"
                                onClick={handleClose}
                                className={`${"/sign-up" === pathname && "text-primary border-b-2 border-primary"
                                    } capitalize font-medium hover:text-primary transition-all`}
                            >
                                Register
                            </Link>
                        </>
                    )}

                    {!loading && currentUser && (
                        <Button variant="destructive">
                            <LogOut />
                        </Button>
                    )}
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
