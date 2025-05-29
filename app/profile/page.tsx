import UserInfo from "@/components/UserInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "💧AquaSync | Profile",
    description:
        "View and update your AquaSync profile information, manage account settings, and personalize your water system experience with ease.",
};

const ProfilePage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-card shadow-md rounded-2xl p-4">
                <h1 className="text-2xl font-semibold text-foreground mb-6">Your Profile</h1>
                <UserInfo />
            </div>
        </div>
    );
};

export default ProfilePage;
