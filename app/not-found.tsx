import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "404 - Page Not Found | 💧AquaSync",
    description:
        "The page you're looking for doesn't exist. Navigate back to AquaSync to manage your smart water purification system in real time.",
}

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 overflow-hidden">
            <XCircle className="text-destructive mb-4" size={64} />
            <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
                Oops! The page you are looking for does not exist or has been moved.
            </p>
            <Link href="/">
                <Button variant="default" className="px-6 py-2 text-base">
                    Go Home
                </Button>
            </Link>
        </div>
    );
};

export default NotFound;
