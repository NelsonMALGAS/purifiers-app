"use client";

import { links } from "@/constants/success";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
    const pathname = usePathname();
    const { currentUser, loading } = useAuth()

    return (
        <nav className="container mx-auto flex gap-8">
            {links.map((link, index) => {
                return (
                    <Link href={link.path} key={index} className={`${link.path === pathname && "text-primary border-b-2 border-primary"} capitalize font-medium hover:text-primary transition-all`}>
                        {link.name}
                    </Link>
                );
            })}

            {!loading && !currentUser && (
                <>
                    <Link href="/login" className={`${"/login" === pathname && "text-primary border-b-2 border-primary"} capitalize font-medium hover:text-primary transition-all`}>
                        Login
                    </Link>
                    <Link href="/sign-up" className={`${"/sign-up" === pathname && "text-primary border-b-2 border-primary"} capitalize font-medium hover:text-primary transition-all`}>
                        Register
                    </Link>
                </>)}

        </nav>
    );
};

export default Navbar;