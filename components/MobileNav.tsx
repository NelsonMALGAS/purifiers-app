"use client";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "../components/ui/sheet";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { links } from "@/constants/success";
import Image from "next/image";
import { ModeToggle } from "./ui/mode-toggle";

const MobileNav = () => {
    const pathname = usePathname();

    return (
        <Sheet>
            <SheetTrigger className="flex justify-center items-center">
                <CiMenuFries className="text-[32px] text-primary" />
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                {/* Accessible Dialog Title */}
                <SheetHeader>
                    <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                </SheetHeader>

                {/* Logo + Title */}
                <div className="mt-32 mb-40 text-center">
                    <Link href="/" className="flex justify-center items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="AquaSync Logo"
                            width={40}
                            height={40}
                            className="rounded-md shadow-sm"
                        />
                        <span className="text-2xl font-semibold text-foreground flex gap-2">
                            <span className="text-primary"> Aqua</span>Sync
                            <ModeToggle />
                        </span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col justify-center items-center gap-2">
                    {links.map((link, index) => (
                        <Link
                            href={link.path}
                            key={index}
                            className={`${link.path === pathname && "text-primary border-b-2 border-primary"
                                } capitalize font-medium hover:text-primary transition-all`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
