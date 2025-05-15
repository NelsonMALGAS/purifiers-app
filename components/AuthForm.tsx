"use client"
import { AuthErrors } from "@/types";
import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import showToastMessage from "./showToastMessage";
import { authSuccessMessages, authErrorMessages } from "@/constants/success";
import { useRouter } from "next/navigation";

interface AuthFormProps {
    mode: "login" | "signup";
    welcomeTitle: string;
    welcomeSubtitle: string;
    label: string;
}

const AuthForm = ({ label, mode, welcomeSubtitle, welcomeTitle }: AuthFormProps) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<AuthErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const { handleLogin, loading, handlePasswordReset, handleRegister } = useAuth()

    const isSignup = mode === "signup";
    const disableBtn = loading || isSubmitting

    const validate = () => {
        const newErrors: typeof errors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be 6 or more characters long.";
        }


        if (isSignup) {
            if (!confirmPassword) {
                newErrors.confirmPassword = "Confirm your password.";
            } else if (password !== confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validate()) {
            setIsSubmitting(false);
            return;
        }

        try {
            let result;

            if (mode === "signup") {
                result = await handleRegister(email, password);
                if (result.success) {
                    showToastMessage({ type: "success", ...authSuccessMessages.signup });
                    router.push("/")
                } else {
                    throw new Error(result.error || "Unknown signup error");
                }
            } else if (mode === "login") {
                result = await handleLogin(email, password);
                if (result.success) {
                    showToastMessage({ type: "success", ...authSuccessMessages.login });
                    router.push("/")
                } else {
                    throw new Error(result.error || "Unknown login error");
                }
            }
        } catch (err) {
            const fallback = mode === "signup" ? authErrorMessages.signup : authErrorMessages.login;

            showToastMessage({
                type: "error",
                message: fallback.message,
                description:
                    err instanceof Error
                        ? `${fallback.description} (${err.message})`
                        : fallback.description,
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    const resetPassword = async () => {
        try {
            handlePasswordReset(email)
            showToastMessage({ type: "success", ...authSuccessMessages.reset })
        } catch (error) {
            if (error instanceof Error) {
                showToastMessage({
                    type: "error",
                    description: authErrorMessages.reset.description,
                    message: `${authErrorMessages.reset.message} (${error.message})`
                })
            }
            showToastMessage({
                type: "error",
                description: authErrorMessages.reset.description,
                message: `${authErrorMessages.reset.message}`
            })
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Left Side - Welcome */}
            <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-muted text-muted-foreground p-10 text-center rounded-r-3xl shadow-md dark:bg-muted/40">
                <Image
                    src="/logo.png"
                    alt="App Logo"
                    className="w-24 h-24 mb-6 rounded-2xl shadow-sm"
                    width={96}
                    height={96}
                />

                <h1 className="text-3xl font-bold text-foreground mb-2">{welcomeTitle}</h1>
                <p className="text-sm mb-2">{welcomeSubtitle}</p>

                {/* Tagline */}
                <p className="text-md font-bold capitalize italic text-muted-foreground mb-4">
                    Clean water, smart management.
                </p>

                {/* App Description */}
                <p className="text-sm text-muted-foreground max-w-md mb-4">
                    AquaSync helps you monitor, maintain, and manage your water purifiers effortlessly.
                    Designed for both individual owners and administrators, it ensures optimal performance and timely maintenance.
                </p>

                {/* Key Features List */}
                <ul className="text-sm text-muted-foreground mt-2 space-y-2 text-left max-w-sm">
                    <li>✅ Real-time purifier monitoring</li>
                    <li>✅ Filter usage tracking & alerts</li>
                    <li>✅ Centralized inventory management</li>
                    <li>✅ Role-based dashboards for admins and owners</li>
                    <li>✅ Smart maintenance scheduling</li>
                </ul>
            </div>



            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-background">
                <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
                    <h2 className="text-2xl font-semibold text-center text-foreground">{label}</h2>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`bg-card border border-border focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none px-4 py-2 rounded-xl ${errors.email ? "border-destructive" : ""
                                }`}
                            placeholder="example@gmail.com"
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Label className="underline hover:text-muted" onClick={resetPassword}>forgot Pasword?</Label>
                        </div>


                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`bg-card border border-border focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none px-4 py-2 rounded-xl ${errors.password ? "border-destructive" : ""
                                }`}
                            placeholder="*******"
                        />


                        {errors.password && (
                            <p className="text-sm text-destructive mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password (Signup Only) */}
                    {isSignup && (
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`bg-card border border-border focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none px-4 py-2 rounded-xl ${errors.confirmPassword ? "border-destructive" : ""
                                    }`}
                                placeholder="*******"
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" disabled={disableBtn}>
                        {label}
                    </Button>
                </form>
            </div>
        </div>
    );


}

export default AuthForm