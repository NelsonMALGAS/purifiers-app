"use client"

import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Droplet, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
    {
        icon: <Droplet className="text-primary w-6 h-6" />,
        title: "Real-Time Monitoring",
        description: "Track purifier status, filter life & performance instantly.",
    },
    {
        icon: <PhoneCall className="text-primary w-6 h-6" />,
        title: "Smart Notifications",
        description: "Get alerts directly to your phone for maintenance & issues.",
    },
    {
        icon: <CheckCircle className="text-primary w-6 h-6" />,
        title: "Simple Management",
        description: "Easily manage multiple purifiers across locations.",
    },
];

const LandingPage = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <section className="min-h-screen flex justify-center items-center">
                <p className="text-lg font-medium">Loading...</p>
            </section>
        );
    }

    return (
        <main className="px-4 md:px-8 lg:px-16 py-4 space-y-4">
            {/* Hero */}
            <section className="flex flex-col-reverse lg:flex-row items-center gap-10 text-center lg:text-left">
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                        Welcome to <span className="text-primary">AquaSync</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Keep your water purification systems monitored and maintained—smart, simple, and synced.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        {currentUser ? (
                            <>
                                <Link href="/dashboard">
                                    <Button className="w-full sm:w-auto">Go to Dashboard</Button>
                                </Link>
                                <Link href="/profile">
                                    <Button variant="outline" className="w-full sm:w-auto">Your Profile</Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/sign-up">
                                    <Button className="w-full sm:w-auto">Create Account</Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" className="w-full sm:w-auto">Login</Button>
                                </Link>
                            </>
                        )}
                    </div>

                </div>

                <div className="flex-1 flex justify-center">
                    <Image
                        src="/logo.png"
                        alt="Water Purifier"
                        width={400}
                        height={400}
                        className="rounded-xl shadow-md"
                    />
                </div>
            </section>

            <Separator className="bg-muted h-[2px]" />

            {/* Features */}
            <section className="text-center space-y-4">
                <h2 className="text-3xl font-semibold">Why AquaSync?</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3 text-left">
                            <div>{feature.icon}</div>
                            <h3 className="text-lg font-semibold">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Separator className="bg-muted h-[2px]" />

            {/* User Info */}
            {currentUser && (
                <section className="space-y-4 text-center">
                    <h2 className="text-2xl font-bold">Welcome Back, {currentUser.email} 👋</h2>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <p className="text-muted-foreground">
                            <span className="font-semibold mr-2">Last Login:</span>
                            {currentUser?.metadata?.lastSignInTime
                                ? new Date(currentUser.metadata.lastSignInTime).toLocaleString("US-en", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit"
                                })
                                : "N/A"}
                        </p>
                        <p className="text-muted-foreground">
                            <span className="font-semibold mr-2">Since:</span>
                            {currentUser?.metadata?.creationTime
                                ? new Date(currentUser.metadata.creationTime).toLocaleString("US-en", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit"
                                })
                                : "N/A"}
                        </p>
                    </div>


                </section>
            )}
        </main>
    );
};

export default LandingPage;
