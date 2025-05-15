import AuthForm from "@/components/AuthForm";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "AquaSync | Login",
    description:
        "Log in to your AquaSync account to access your purifier dashboard, view usage statistics, and manage your water systems securely.",
};


const LoginPage = () => {
    return (
        <AuthForm
            mode="login"
            welcomeTitle="Welcome Back 👋"
            welcomeSubtitle="Access your water purifier dashboard — monitor status, view logs, and keep everything running smoothly."
            label="Sign In"
        />

    )
}

export default LoginPage