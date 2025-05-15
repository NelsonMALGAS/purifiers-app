"use client";

import { links } from "@/constants/success";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="container mx-auto flex gap-8">
            {links.map((link, index) => {
                return (
                    <Link href={link.path} key={index} className={`${link.path === pathname && "text-primary border-b-2 border-primary"} capitalize font-medium hover:text-primary transition-all`}>
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Navbar;