import AuthForm from '@/components/AuthForm'
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "💧AquaSync | Register",
    description:
        "Create your AquaSync account to start managing your water purifiers with real-time insights and user-friendly controls.",
};


const RegisterPage = () => {
    return (
        <AuthForm
            mode="signup"
            welcomeTitle="Welcome to 💧AquaSync!"
            welcomeSubtitle="Manage your water purifiers with ease — track usage, monitor health, and stay on top of maintenance."
            label="Create Account"
        />


    )
}

export default RegisterPage