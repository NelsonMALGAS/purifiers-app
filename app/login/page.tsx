import AuthForm from "@/components/AuthForm";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "InventoryIQ | Login",
    description: " Log in to your InventoryIQ account to access your dashboard and features"
}

const LoginPage = () => {
    return (
        <AuthForm
            mode="login"
            welcomeTitle="Welcome Back 👋"
            welcomeSubtitle="Manage your stock smarter, not harder."
            label="Sign In"
        />
    )
}

export default LoginPage