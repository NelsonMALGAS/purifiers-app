import AuthForm from '@/components/AuthForm'
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "InventoryIQ | Register",
    description: "Create a new account to get started with InventoryIQ"
}

const RegisterPage = () => {
    return (
        <AuthForm
            mode="signup"
            welcomeTitle="Welcome to InventoryIQ!"
            welcomeSubtitle="Streamline your inventory with smart tools."
            label="Create Account"
        />

    )
}

export default RegisterPage