import LandingPage from "@/components/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "💧AquaSync | Home",
  description:
    "Welcome to 💧AquaSync — your smart purifier management system. Monitor purifier health, track user activity, and ensure clean water, anytime and anywhere.",
};


const Home = () => {
  return (
    <LandingPage />
  )
}

export default Home